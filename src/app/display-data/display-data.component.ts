import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { TasklistService } from '../services/tasklist.service';
import { FormGroup, FormControl , ReactiveFormsModule} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { config } from '../config';

const snapshotToArray = (snapshot) => {
	const returnArr = [];

	snapshot.forEach((childSnapshot) => {
		const item = childSnapshot.val();
		console.log("In snapshot array==========>",item, childSnapshot.key)
		if(typeof item == 'object')
			item.id = childSnapshot.key;

		returnArr.push(item);
	});

	return returnArr;
};

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
	tracks:any;
	taskArray : any[];
	addTaskForm : FormGroup;
	userId;
	Track: any[];
	tracks1: any[];
	
	constructor(public dialog: MatDialog, private firebasedb: AngularFireDatabase,public auth: AuthService,
		private router: Router, private _firebaseAuth: AngularFireAuth, private tasklistService: TasklistService, public afs: AngularFirestore) { 

		this.addTaskForm = new FormGroup({
			title: new FormControl(''),
			desc: new FormControl(''),
			status: new FormControl({value: 'to-do'}),
			priority: new FormControl(''),
		});
		
		this.userId = firebase.auth().currentUser.uid
		console.log(this.userId);
	}

	async ngOnInit() {
		const listArray = this.firebasedb.database.ref().child('task');
		const allTaskSnapshot = await listArray.once('value');
		this.taskArray = snapshotToArray(allTaskSnapshot)
		.map(user => ({
			title: user.title,
			uid: user.id,
			desc: user.desc,
			priority: user.priority,
			status: user.status,
		}));
		console.log(this.taskArray);

		this.userId = firebase.auth().currentUser.uid
		console.log(this.userId);
	}

	drop(event: CdkDragDrop<string[]>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex);
		}
	}

	getPriorityClass(priority){
		switch (Number(priority)) {
			case 4:
			return {class:"primary", title:"Low"}
			break;

			case 3:
			return {class:"warning", title:"Medium"}
			break;

			case 2:
			return {class:"success", title:"High"}
			break;

			case 1:
			return {class:"danger", title:"Highest"}
			break;

			default:
			return ""
			break;
		}
	}

	openDialog($evt): void {
		const dialogRef = this.dialog.open(MyDialog, {
			width: '500px',
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}
	// logout(){
		// 	firebase.auth().signOut().then(function() {
			// 	}).catch(function(error) {
				// 	});
				// }

				deleteTask(itemId){
					console.log(itemId);
					this.tasklistService.removeTask(itemId);
				}

			}
			@Component({
				selector: 'dig-com',
				templateUrl: './my-dialog.html',
				styleUrls: ['./display-data.component.css']
			})

			export class MyDialog {
				addTaskForm : FormGroup;
				constructor(){

					this.addTaskForm = new FormGroup({
						title: new FormControl(''),
						desc: new FormControl(''),
						status: new FormControl({value: 'to-do'}),
						priority: new FormControl(''),
					});

				}
				addTask(form){
					console.log(form)
					firebase.database().ref('task/').push({
						title: form.title,
						desc: form.desc,
						status: form.status.value,
						priority: form.priority
					});
					console.log(form);
				}
			}
