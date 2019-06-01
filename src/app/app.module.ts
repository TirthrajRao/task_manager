import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
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
import { DisplayDataComponent, MyDialog, Edittask} from './display-data/display-data.component';
import { AuthService } from './services/auth.service';
import { combineLatest } from 'rxjs'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NgxLoadingModule } from 'ngx-loading';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { TasklistService } from './services/tasklist.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { EdittaskComponent } from './edittask/edittask.component';




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
	DisplayDataComponent,
	MyDialog,
  Edittask,
  EdittaskComponent,
  ],
  imports: [
  HttpClientModule,
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
  MatIconModule,
  MatToolbarModule,
  MatDialogModule,
  MatSelectModule,
  MatCardModule,
  DragDropModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatStepperModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  NgxLoadingModule,
  ],
  entryComponents: [
  MyDialog, 
  Edittask,
  ],
  providers: [ AuthService, TasklistService, AngularFireDatabase ],
  bootstrap: [AppComponent]
})

export class AppModule { }
