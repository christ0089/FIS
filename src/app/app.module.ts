import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { ProductComponent } from './Pages/product/product.component';
import { LoginComponent } from './Pages/login/login.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { AddProductComponent } from './Pages/add-product/add-product.component';
import { ChatsComponent } from './Pages/chats/chats.component';
import { RouterModule, Routes } from '@angular/router';

import { ComponentsModule } from './Components/componentsModule';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
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
  MatMenuModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule
} from '@angular/material';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { DataProvider } from './Services/dataService';
import { AuthService } from './Services/auth_service';
import { PurchaseComponent } from './Pages/product/purchace.component';
import { PostPicture } from './Services/post-picture';
import { HttpClientModule } from '@angular/common/http';

export const firebaseConfig = {
  apiKey: 'AIzaSyAL6_mZ12vpDGb_ZmahBqlX3PSYzA_6JGs',
  authDomain: 'soft-eng-d42c8.firebaseapp.com',
  databaseURL: 'https://soft-eng-d42c8.firebaseio.com',
  projectId: 'soft-eng-d42c8',
  storageBucket: 'soft-eng-d42c8.appspot.com',
  messagingSenderId: '299889855672'
};

const appRoutes: Routes = [
  { path: 'products', children: [
    { path: '', component: HomeComponent },
    { path: 'add', component: AddProductComponent } ,
    { path: 'add/:key', component: AddProductComponent } ,
    { path: ':key', component: ProductComponent } ,
  ] },
  {
    path: 'user/:id',
    component: ProfileComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'chats',
    component: ChatsComponent
  },
  {
    path: 'chats/:key',
    component: ChatsComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  { path: '**', component: HomeComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    ProductComponent,
    AddProductComponent,
    LoginComponent,
    SignupComponent,
    AddProductComponent,
    ChatsComponent,
    PurchaseComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MatBadgeModule,
    ComponentsModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatListModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [DataProvider, PostPicture,AuthService],
  bootstrap: [AppComponent],
  entryComponents: [
    PurchaseComponent
  ]
})
export class AppModule {}
