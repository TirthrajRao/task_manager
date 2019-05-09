import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';

@Component({
	selector: 'app-display-data',
	templateUrl: './display-data.component.html',
	styleUrls: ['./display-data.component.css']
})
export class DisplayDataComponent implements OnInit {

	constructor(public auth: AuthService,
		private router: Router, private _firebaseAuth: AngularFireAuth) { }

	ngOnInit() {
	}
	logout(){
		firebase.auth().signOut().then(function() {
			console.log("log out");
		}).catch(function(error) {
		});
	}
}
