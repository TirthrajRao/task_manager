import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { TasklistService } from '../services/tasklist.service';
import { FormGroup, FormControl , ReactiveFormsModule} from '@angular/forms';
interface Task {
	title: string;
	desc: string;
	status:'to-do';
	priority:string;
	
}

@Component({
	selector: 'app-display-data',
	templateUrl: './display-data.component.html',
	styleUrls: ['./display-data.component.css'],
	
})
export class DisplayDataComponent implements OnInit {

	toDoListArray : any[];
	addTaskForm : FormGroup;

	constructor(public auth: AuthService,
		private router: Router, private _firebaseAuth: AngularFireAuth, private tasklistService: TasklistService) { 
		this.addTaskForm = new FormGroup({
			title: new FormControl(''),
			desc: new FormControl(''),
			status: new FormControl({value: 'to-do'}),
			priority: new FormControl(''),

		});
	}
	ngOnInit() {
		this.tasklistService.getToDoList().snapshotChanges()
		.subscribe(item=>{
			this.toDoListArray = [];
			item.forEach(element =>{
				var x = element.payload.toJSON();
				this.toDoListArray.push(x);
				console.log(x);
			})
		});
	}

	logout(){
		firebase.auth().signOut().then(function() {
			console.log("log out");
		}).catch(function(error) {
		});
	}
	
	addTask(form){
		console.log(form)
		this.tasklistService.addTask(form.value);
		firebase.database().ref('task/').push({
			title: form.title,
			desc: form.desc,
			status: form.status.value,
			priority: form.priority
		});
		console.log(form);

	}




}
