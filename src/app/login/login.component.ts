import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';

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
// login(email: string, password: string) {
	//     this._firebaseAuth
	//       .auth
	//       .signInWithEmailAndPassword(email, password)
	//       .then(value => {
		//         if (this.firebaseAuth.auth) {
			//           if (this.firebaseAuth.auth.currentUser) { this.isLoggedIn = true; }
			//           this.router.navigate(["home"]);
			//         }
			//         else {
				//           alert('Username or Password is not correct!');
				//           this.router.navigate([""]);
				//         }
				//       })
				//       .catch(err => {
					//         alert(`'Something went wrong:', ${err.message}`);
					//       });
					//   }


					// signInWithTwitter() {
						// 	this.auth.signInWithTwitter()
						// 	.then((res) => { 
							// 		this.router.navigate(['display-data'])
							// 	})
							// 	.catch((err) => console.log(err));
								// }