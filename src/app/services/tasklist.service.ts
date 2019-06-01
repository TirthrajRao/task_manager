import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';
import { tap, map, take } from 'rxjs/operators';
interface Task {
	title: string;
	desc: string;
	status:'to-do';
	priority:string;
	
}

@Injectable({
	providedIn: 'root'
})
export class TasklistService {

	toDoList : AngularFireList<any>;

	constructor(private router: Router, private authService: AuthService, private firebasedb: AngularFireDatabase) { }
	canActivate() {
		if ( this.authService.isLoggedIn() ) {
			return true;
		}
		this.router.navigate(['/']);
		return false;
	}
	getToDoList(){
		this.toDoList = this.firebasedb.list('task');
		return this.toDoList;
	}

	removeTask($key){
		console.log($key);
		this.toDoList.remove($key);
	}

}

