import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MainComponent } from './main/main.component'
import { NavbarComponent } from './navbar/navbar.component'
import { RecruitmentComponent } from './recruitment/recruitment.component'

import { AngularFireModule } from '@angular/fire'
import {
  AngularFireAnalyticsModule,
  ScreenTrackingService,
} from '@angular/fire/analytics'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { environment } from 'src/environments/environment'
import { BilletsComponent } from './billets/billets.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { CalenderComponent } from './calender/calender.component'
import { UnitPhotosComponent } from './unit-photos/unit-photos.component'
import { QRDComponent } from './qrd/qrd.component'
import { ShopsLoginComponent } from './shops-login/shops-login.component'
import { ShopsComponent } from './shops/shops.component'
import { AuthService } from './services/auth/auth.service'

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
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [ScreenTrackingService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
