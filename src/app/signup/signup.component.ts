import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../services/auth.service';

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

	constructor(public auth: AuthService,private router: Router) {
		this.signupForm = new FormGroup({
			email: new FormControl(''),
			password: new FormControl(''),
			
		});
	
	}
	ngOnInit() {
		;
	}

	signUp(form){
		console.log(form);
		firebase.auth().createUserWithEmailAndPassword(form.email, form.password).then((res) => { 
			firebase.database().ref('users/').push({
				email: form.email,
				password: form.password
			});
			console.log(form);
			console.log("resssssssssss",res);
			this.router.navigate(['login'])
		})
		.catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
		});

	}

}

