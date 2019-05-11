import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DisplayDataComponent } from './display-data/display-data.component';
import { AuthService } from './services/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule,MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TasklistService } from './services/tasklist.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';




 export const config = {
	apiKey: "AIzaSyDCgMHeyRnGckj-jsxxInLz38c7nmkefkQ",
	authDomain: "newproject1-6e4c1.firebaseapp.com",
	databaseURL: "https://newproject1-6e4c1.firebaseio.com",
	projectId: "newproject1-6e4c1",
	storageBucket: "newproject1-6e4c1.appspot.com",
	messagingSenderId: "641079275851",
	appId: "1:641079275851:web:151b458fe4dff673"
};

@NgModule({
	declarations: [
	AppComponent,
	LoginComponent,
	SignupComponent,
	DisplayDataComponent
	],
	imports: [
	BrowserModule,
	ReactiveFormsModule,
	AppRoutingModule,
	AngularFireModule.initializeApp(config),
	AngularFirestoreModule, // firestore
	AngularFireAuthModule, // auth
	AngularFireStorageModule, BrowserAnimationsModule, // storage
	MatButtonModule,
	MatCheckboxModule,
	MatInputModule,
	MatFormFieldModule,
	MatIconModule
	],
	providers: [ AuthService, TasklistService, AngularFireDatabase ],
	bootstrap: [AppComponent]
})

export class AppModule { }
