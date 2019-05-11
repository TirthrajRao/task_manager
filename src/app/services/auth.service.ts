import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { auth } from  'firebase/app';
import {Router} from '@angular/router';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

interface User {
	email: string;
	password: string;
	
}

@Injectable({ 
	providedIn: 'root'
})
export class AuthService { 
	private user: Observable<firebase.User>;
	private userDetails: firebase.User = null;
	
	private currentUserSubject: BehaviorSubject<any>;
	public currentUser: Observable<any>;
	constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private http:HttpClient) { 
		
		this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
		this.currentUser = this.currentUserSubject.asObservable();

		this.user = _firebaseAuth.authState;
		this.user.subscribe(
			(user) => {
				if (user) {
					this.userDetails = user;
					console.log(this.userDetails);
					localStorage.setItem('userDetails', JSON.stringify(this.userDetails));
				}
				else {
					this.userDetails = null;
				}
			}
			);

	}
	public get currentUserValue(): any {
		return this.currentUserSubject.value;
	}


	setLoggedIn(value: boolean){
		localStorage.setItem('loggedIn','true')
	}


	signInRegular(email, password) {
		const credential = firebase.auth.EmailAuthProvider.credential( email, password );
		return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
		
	}
	signInWithTwitter() {
		return this._firebaseAuth.auth.signInWithPopup(
			new firebase.auth.TwitterAuthProvider()
			)
	}
	signInWithFacebook() {
		return this._firebaseAuth.auth.signInWithPopup(
			new firebase.auth.FacebookAuthProvider()
			)
	}
	signInWithGoogle() {
		return this._firebaseAuth.auth.signInWithPopup(
			new firebase.auth.GoogleAuthProvider()
			)
	}
	isLoggedIn() {
		if (this.userDetails == null ) {
			return false;
		} else {
			return true;
		}

	}

	// signOut() {
		// 	this._firebaseAuth.auth.signOut()
		// 	.then((res) => this.router.navigate(['/']));
		// }

	}

