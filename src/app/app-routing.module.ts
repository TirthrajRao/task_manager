import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DisplayDataComponent } from './display-data/display-data.component';
import { AuthGuard } from './auth.guard';
import { EdittaskComponent } from './edittask/edittask.component'
const routes: Routes = [
{
		path:'login',
		component:LoginComponent 
	},

{
	path:"",
	canActivate: [AuthGuard],
	children:[
	{
		path:'',
		component:LoginComponent 
	},
	{
		path:'signup',
		component:SignupComponent
	},
	{
		path:'display-data',
		component:DisplayDataComponent
	}
	]}
	];

	@NgModule({
		imports: [RouterModule.forRoot(routes)],
		exports: [RouterModule]
	})
	export class AppRoutingModule { }


