import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService} from './auth.service'
import { tap, map, take } from 'rxjs/operators';



@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private authService: AuthService) { }
	canActivate() {
		if ( this.authService.isLoggedIn() ) {
			return true;
		}
		this.router.navigate(['/']);
		return false;
	}
}
