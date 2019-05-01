import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { ProductComponent } from './Pages/product/product.component';

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
} from '@angular/material';
import { AngularFireModule } from '@angular/fire';

export const firebaseConfig = {
  apiKey: 'AIzaSyDAGR7GFSd4YbDuO66JAr3IWerlqklgRkc',
  authDomain: 'teclink-8e19c.firebaseapp.com',
  databaseURL: 'https://teclink-8e19c.firebaseio.com',
  projectId: 'teclink-8e19c',
  storageBucket: 'teclink-8e19c.appspot.com',
  messagingSenderId: '147182383690'
};

const appRoutes: Routes = [
  { path: '**', component: HomeComponent },
  { path: 'product/:id',    component: ProductComponent },
  {
    path: 'user/:id',
    component: ProfileComponent,
  }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MatBadgeModule,
    ComponentsModule,
    MatBottomSheetModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    RouterModule.forRoot(
      appRoutes,
    ),
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
