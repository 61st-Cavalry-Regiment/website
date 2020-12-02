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
  CONFIG,
  ScreenTrackingService,
  UserTrackingService,
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
import { SafePipe } from './pipes/safe.pipe'
import { TestComponent } from './test/test.component'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatChipsModule } from '@angular/material/chips'
import { MatTabsModule } from '@angular/material/tabs'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatDialogModule } from '@angular/material/dialog'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { FormsModule } from '@angular/forms'
import { AdminComponent } from './shops/admin/admin.component'
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component'
import { HomeComponent } from './shops/home/home.component'
import { WebsiteComponent } from './shops/website/website.component'
import { GenerateCodeComponent } from './shops/admin/generate-code/generate-code.component'
import { RegisterComponent } from './register/register.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { UsermgmtComponent } from './usermgmt/usermgmt.component'

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
    SafePipe,
    TestComponent,
    AdminComponent,
    NotAuthorizedComponent,
    HomeComponent,
    WebsiteComponent,
    GenerateCodeComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    UsermgmtComponent,
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
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    ScreenTrackingService,
    AuthService,
    UserTrackingService,
    {
      provide: CONFIG,
      useValue: {
        allow_ad_personalization_signals: false,
        anonymize_ip: true,
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
