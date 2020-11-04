import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { BilletsComponent } from './billets/billets.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CalenderComponent } from './calender/calender.component';
import { UnitPhotosComponent } from './unit-photos/unit-photos.component';
import { QRDComponent } from './qrd/qrd.component';
import { ShopsLoginComponent } from './shops-login/shops-login.component';
import { ShopsComponent } from './shops/shops.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    RecruitmentComponent,
    BilletsComponent,
    NotFoundComponent,
    CalenderComponent,
    UnitPhotosComponent,
    QRDComponent,
    ShopsLoginComponent,
    ShopsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [{ provide: BUCKET, useValue: '61st-web' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
