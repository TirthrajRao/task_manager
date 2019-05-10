import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { auth } from  'firebase/app';
import {Router} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
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
	constructor(private _firebaseAuth: AngularFireAuth, private router: Router) { 
		this.user = _firebaseAuth.authState;
		this.user.subscribe(
			(user) => {
				if (user) {
					this.userDetails = user;
					console.log(this.userDetails);
				}
				else {
					this.userDetails = null;
				}
			}
			);
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				var displayName = user.displayName;
				var email = user.email;
				var emailVerified = user.emailVerified;
				var photoURL = user.photoURL;
				var isAnonymous = user.isAnonymous;
				var uid = user.uid;
				var providerData = user.providerData;
				// ...
			} else {

			}
		});


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

	signOut() {
		this._firebaseAuth.auth.signOut()
		.then((res) => this.router.navigate(['/']));
	}

}

