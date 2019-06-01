import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var $ : any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'newProject';
	currentUser:any;

	constructor(public router : Router){
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}
	ngOnInit() {
		
	}
}