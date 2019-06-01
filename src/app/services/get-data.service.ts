import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
	
	constructor(private router: Router, private authService: AuthService, private firebasedb: AngularFireDatabase) { }
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const currentUser = this.authService.currentUserValue;
		console.log(currentUser);
		if (currentUser != null) {
			return true;
		}
		this.router.navigate(['/login']);
		return false;
	}
	
}
