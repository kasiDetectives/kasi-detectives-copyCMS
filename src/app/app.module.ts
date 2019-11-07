import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAqj9dyDMnp_Yjb2JiSr899kubQBx3dzbI",
  authDomain: "kasidetectives.firebaseapp.com",
  databaseURL: "https://kasidetectives.firebaseio.com",
  projectId: "kasidetectives",
  storageBucket: "kasidetectives.appspot.com",
  messagingSenderId: "207670776123",
  appId: "1:207670776123:web:b1f7be1f7bb88f7d70271e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
