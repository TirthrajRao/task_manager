import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router'; 

@Component({
	selector: 'app-edittask',
	templateUrl: './edittask.component.html',
	styleUrls: ['./edittask.component.css']
})
export class EdittaskComponent implements OnInit {

	currentUser: any;

	constructor(private router: Router,
		private _authService: AuthService) {
		this._authService.currentUser.subscribe(x => this.currentUser = x);
	}

	ngOnInit() {
	}

}
