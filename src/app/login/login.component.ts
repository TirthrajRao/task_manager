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
			alert("login sucessfully")
			this.router.navigate(['display-data'])
		}).catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			alert("first u have to sign in")

		});

	}
	signInWithFacebook() {
		console.log("hiiiiiiiiiiiiiiiiiiiiiii");
		this.auth.signInWithFacebook()
		.then((res) => { 

			console.log("resssssssssss",res);
			this.router.navigate(['display-data'])
		})
		.catch((err) => console.log(err));
	}
	signInWithGoogle() {
		this.auth.signInWithGoogle()
		.then((res) => { 
			console.log("hiiiiiiiiiiiiiiiiiiiiiii");
			console.log("resssssssssss",res);
			this.router.navigate(['display-data'])
		})
		.catch((err) => console.log(err));
	}
}