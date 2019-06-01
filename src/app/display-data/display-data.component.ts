import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { TasklistService } from '../services/tasklist.service';
import { FormGroup, FormControl , ReactiveFormsModule, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { EdittaskComponent } from '../edittask/edittask.component';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { config } from '../config';
import * as _ from 'lodash';
import {MAT_DIALOG_DATA} from '@angular/material';
declare var $ : any;
import { combineLatest } from 'rxjs'
import { forkJoin } from 'rxjs'
import { AngularFireStorage } from '@angular/fire/storage';
import { map, switchMap } from 'rxjs/operators';

const snapshotToArray = (snapshot) => {
	const returnArr = [];
	snapshot.forEach((childSnapshot) => {
		const item = childSnapshot.val();
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
	date: string;
}
@Component({
	selector: 'app-display-data',
	templateUrl: './display-data.component.html',
	styleUrls: ['./display-data.component.css'],
	
})
export class DisplayDataComponent implements OnInit {
	tracks:any;
	getAllTask: any;
	taskArray : any[];
	addTaskForm : FormGroup;
	editTaskForm : FormGroup
	emailInput: String;
	selectedFile;
	currentInput;
	uploaFile;
	colect: any;
	allTask: any;
	selectedProjectTasks: any;
	collectionName;
	nameOFcollection:any[];
	data1: any;
	
	constructor(public dialog: MatDialog, public storage: AngularFireStorage, private firestore: AngularFirestore, private firebasedb: AngularFireDatabase,public auth: AuthService,
		private router: Router, private _firebaseAuth: AngularFireAuth, private tasklistService: TasklistService, public afs: AngularFirestore,) { 

		this.addTaskForm = new FormGroup({
			title: new FormControl('', [Validators.required]),
			desc: new FormControl('', [Validators.required]),
			status: new FormControl({value: 'to-do'}),
			priority: new FormControl('', [Validators.required]),
			date: new FormControl(''),
			// file: new FormControl(''),
		});

		this.editTaskForm = new FormGroup({
			title: new FormControl('', [Validators.required]),
			desc: new FormControl('', [Validators.required]),
			priority: new FormControl('', [Validators.required]),
			date: new FormControl(''),
		});
		this.getEmptyTracks()
	}

	getEmptyTracks(){
		this.tracks = [
		{
			"title": "Todo",
			"id": "to-do",
			"folder": "home",
			"task": [

			]
		},
		{
			"title": "Done",
			"id": "done",
			"folder": "task",
			"task": [

			]
		},
		];
		console.log("tracks====-=-_+_++",this.tracks);
	}
	
	getPriorityClass(priority){
		switch (priority) {
			case "Medium":
			return 'Medium';
			break;

			case "Low":
			return 'Low';
			break;

			case "High":
			return 'High';
			break;

			case "Highest":
			return 'Highest';
			break;

			default:
			return  null;
			break;
		}
	}
	getStatusClass(status){
		switch (status) {
			case "to-do":
			return 'to-do';
			break;

			case "done":
			return 'done';
			break;

			default:
			return ;
			break;
		}
	}
	getStatusClassOfTitle(title){
		switch (title) {
			case "Todo":
			return 'Todo';
			break;

			case "Done":
			return 'Done';
			break;

			default:
			return ;
			break;
		}
	}
	ngOnInit() {
		this.getTaskDetail();
		this.grtAllCollecton();
	}
	onFileChange(event){ 
		console.log(event);
		this.uploaFile = event.target.files[0];
	}
	async grtAllCollecton(){
		const listArray = this.firebasedb.database.ref().child('task');
		const allTaskSnapshot = await listArray.once('value');
		this.colect = snapshotToArray(allTaskSnapshot)
		console.log("thissss===>",this.colect);
		console.log("thissss===>",this.colect);
	}

	updateStatusOfTask(status: string, data){
		console.log(this.collectionName);
		var collection = this.collectionName;
		console.log("daaaaaaaaaa", data);
		console.log("new status=====>",status);
		this.firebasedb.object('task/' + collection + '/' + data.uid)
		.update({status: status});
		// window.location.reload();
	}

	async filterTracks(collection){
		console.log("task is ===>",collection);
		this.collectionName = collection;
		this.getEmptyTracks();
		const getTask = this.firebasedb.database.ref().child('task/'+ collection + '/');
		console.log("allllll===>",getTask)
		const allTaskSnapshot = await getTask.once('value');
		console.log("allllll===>",allTaskSnapshot)
		this.getAllTask = snapshotToArray(allTaskSnapshot)
		.map(user => ({
			title: user.title,
			uid: user.id,
			desc: user.desc,
			priority: user.priority,
			status: user.status,
			date: user.date,
			createdAt: user.createdAt,
		}));
		console.log("all task===>",this.getAllTask)
		_.forEach(this.getAllTask , (task)=>{
			_.forEach(this.tracks , (track)=>{
				if(task.status == track.id){
					track.task.push(task);
				};
			})
		})
	}
	async getTaskDetail(){
		const listArray = this.firebasedb.database.ref().child('task/company');
		const allTaskSnapshot = await listArray.once('value');
		this.taskArray = snapshotToArray(allTaskSnapshot)
		.map(user => ({
			title: user.title,
			uid: user.id,
			desc: user.desc,
			priority: user.priority,
			status: user.status,
			date: user.date,
			createdAt: user.createdAt
		}));
		console.log("taskkkkk===>",this.taskArray)
		_.forEach(this.taskArray , (task)=>{

			_.forEach(this.tracks , (track)=>{
				if(task.status == track.id){
					track.task.push(task);
				};
			})
		})
	}
	deleteTask(item){
		console.log(item);
		console.log(this.collectionName);
		var collection = this.collectionName;
		this.firebasedb.object('task/'+ collection + '/' +  item.uid)
		.remove();
		alert("Task deleted successfully!!")
		window.location.reload();
	}

	get trackIds(): string[] {
		return this.tracks.map(track => track.id);
	}
	get f() { return this.addTaskForm.controls; }

	onTalkDrop(event: CdkDragDrop<any>) {
		console.log("droppppppppppppp");
		console.log("event")
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex);
			this.updateStatusOfTask(event.container.id, event.container.data[_.findIndex(event.container.data, { 'status': event.previousContainer.id })]);
		}
	}

	onTrackDrop(event: CdkDragDrop<any>) {
		console.log('event in ontrackdrop================>',event);
		console.log("dradddddddd");
		moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
	}

	openDialog($evt): void {
		const dialogRef = this.dialog.open(MyDialog, {
			width: '500px',
			height:'500px'
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}

	openDialog1(task): void {
		console.log("task===>",task);
		console.log(this.collectionName);
		var collection = this.collectionName;

		const dialogRef = this.dialog.open(Edittask, {
			width: '500px',
			height:'400px',
			data: {	task: task,
				collection: collection
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}
	logout(){
		console.log("hiiiii");
		this.auth.signOut().then(function() {
		}).catch(function(error) {
		});
	}
}



@Component({
	selector: 'dig-com',
	templateUrl: './my-dialog.html',
	styleUrls: ['./display-data.component.css']
})

export class MyDialog {
	addTaskForm : FormGroup;
	uploaFile;
	url;
	array;
	allTask : any;
	AccUserImageFile: File;
	constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog, private firebasedb: AngularFireDatabase,){
		this.addTaskForm = new FormGroup({
			title: new FormControl('', [Validators.required]),
			desc: new FormControl('', [Validators.required]),
			status: new FormControl({value: 'to-do'}),
			priority: new FormControl('', [Validators.required]),
			date: new FormControl('', [Validators.required]),
			projectName: new FormControl(''),
			// file: new FormControl(''),
		});
		// this.grtAllCollectonName();
	}

	get f() { return this.addTaskForm.controls; }

	addTask(form){
		console.log(form)
		firebase.database().ref('/task/'+ form.projectName).push({
			title: form.title,
			desc: form.desc,
			status: form.status.value,
			priority: form.priority,
			date: form.date.toString(),
			createdAt: Date(),
			// file: form.file

		});
		console.log(form);
		alert("task added successfully!!")
		// window.location.reload();
	}

	onFileChange(event){ 
		console.log(event);
		this.uploaFile = event.target.files[0];
	}

	onUpload(form){
		console.log("form is", form);
		var file = this.uploaFile;
		console.log("file is=======>", file);
		console.log("filename is=======>", file.name);
		var storageRef = firebase.storage().ref('/images/'+ file.name );
		storageRef.put(file).then(function(snapshot) {
		}).then(function() {
			storageRef.getDownloadURL().then(function(downloadURL) {
				console.log('File available at=====>', downloadURL);
				form.file = downloadURL;
				localFuncToaddTask(form);
			});
		});
		var localFuncToaddTask = function(form){
			console.log(form);
		}
	}
	// grtAllCollectonName(){
		// 	const listArray = this.firebasedb.database.ref().child('task');
		// 	const allTaskSnapshot =  listArray.once('value');
		// 	this.allTask = snapshotToArray(allTaskSnapshot)
		// 	console.log("thissss===>",this.allTask);
		// }
	}

	@Component({
		selector: 'dig-com',
		templateUrl: './edittask.html',
		styleUrls: ['./display-data.component.css']
	})

	export class Edittask {
		editTaskForm : FormGroup
		collectionName;
		getAllTask: any;
		data1: any;
		col;
		constructor(@Inject(MAT_DIALOG_DATA) public data: any, private firebasedb: AngularFireDatabase){
			this.col = data.collection;
			console.log(this.col);
			console.log(data.task.uid);
			this.data1 = data;
			this.editTaskForm = new FormGroup({
				title: new FormControl('', [Validators.required]),
				desc: new FormControl('', [Validators.required]),
				priority: new FormControl('', [Validators.required]),
			});
		}
		editTask(task){
			console.log(task);
			console.log(this.data1);
			var uidOfData = this.data1.task ;
			console.log(uidOfData.uid);
			console.log(task.collection);
			var collection = this.data1.collection;
			this.firebasedb.object('task/' + task.collection + '/' +  uidOfData.uid).update({
				title: task.task.title,
				desc: task.task.desc,
				priority: task.task.priority,
			});
			console.log(task);
			alert("task updated successfully!!")
			// window.location.reload();
		}
	}
