import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	showSpinner = localStorage.getItem('showSpinner') === 'true' ? true : false;
	loginForm : FormGroup;
	currentUser ;
	
	constructor(public auth: AuthService,
		private router: Router, private _firebaseAuth: AngularFireAuth) {
		this.loginForm = new FormGroup({
			email: new FormControl(''),
			password: new FormControl(''),
			
		});
	}
	ngOnInit() {

	}
	login(form){
		console.log(form);
		firebase.auth().signInWithEmailAndPassword(form.email, form.password).then((res)=>{
			console.log("reeessssssss====>",res);
			this.currentUser = res;
			alert("Login sucessfully")
			localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
			this.router.navigate(['/display-data'])
		}).catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log("error code===>", errorCode);
			console.log("error code===>", errorMessage);
			alert( ErroAuthEn.convertMessage(error['code']));
		});

	}
	signInWithFacebook() {
		console.log("hiiiiiiiiiiiiiiiiiiiiiii");
		this.auth.signInWithFacebook()
		.then((res) => { 
			window.location.reload();
			console.log("resssssssssss",res);
			
			this.router.navigate(['/display-data'])
		})
		.catch((err) => console.log(err));
	}
	signInWithGoogle() {
		this.auth.signInWithGoogle()
		.then((res) => { 
			window.location.reload();
			console.log("hiiiiiiiiiiiiiiiiiiiiiii");
			console.log("resssssssssss",res);
			
			
			
			this.router.navigate(['/display-data'])
		})
		.catch((err) => console.log(err));
	}
}

export namespace ErroAuthEn {
	export function convertMessage(code: string): string {
		console.log('called');
		switch (code) {
			case 'auth/user-disabled': {
				return 'Sorry your user is disabled.';
			}
			case 'auth/user-not-found': {
				return 'Sorry user not found.';
			}

			case 'auth/wrong-password': {
				return 'The password is invalid or the user does not have a password.';
			}

			default: {
				return 'Please enter username and password.';
			}
		}
	}
}