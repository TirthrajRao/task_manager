import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../services/auth.service';
declare var $:any;

interface User {
	email: string;
	password: string;
	
}
@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	signupForm : FormGroup;
	submitted = false;
	

	constructor(public auth: AuthService,private router: Router) {
		this.signupForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl( '', [Validators.required, Validators.minLength(6),Validators.maxLength(20)]),
			
		});
	}
	ngOnInit() {
		
	}
	get f() { return this.signupForm.controls; }

	signUp(form){
		console.log(form);
		this.submitted = true;
		if (this.signupForm.invalid) {
			return;
		}
		firebase.auth().createUserWithEmailAndPassword(form.email, form.password).then((res) => { 
			firebase.database().ref('users/').push({
				email: form.email,
				password: form.password
			});
			console.log(form);
			console.log("resssssssssss",res);
			this.router.navigate(['/login'])
			alert("Registerd successfully");
		})
		.catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log("codddddddddd",errorCode);
			console.log("errrrrrrrrrr--", errorMessage);
			alert( ErroAuthEn.convertMessage(error['code']));

		});
	}

}
export namespace ErroAuthEn {
	export function convertMessage(code: string): string {
		console.log('called');
		switch (code) {
			case 'auth/email-already-in-use': {
				return 'The email address is already in use by another account.';
			}
			default: {
				return 'Something went wrong.';
			}
		}
	}
}



