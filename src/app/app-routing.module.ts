import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { BilletsComponent } from './billets/billets.component'
import { CalenderComponent } from './calender/calender.component'
import { AuthGuard } from './guards/auth/auth.guard'
import { TestGuard } from './guards/test.guard'
import { MainComponent } from './main/main.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { QRDComponent } from './qrd/qrd.component'
import { RecruitmentComponent } from './recruitment/recruitment.component'
import { ShopsLoginComponent } from './shops-login/shops-login.component'
import { ShopsComponent } from './shops/shops.component'
import { TestComponent } from './test/test.component'
import { UnitPhotosComponent } from './unit-photos/unit-photos.component'
import {
  AngularFireAuthGuard,
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard'
import { AdminComponent } from './shops/admin/admin.component'
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component'
import { HomeComponent } from './shops/home/home.component'
import { WebsiteComponent } from './shops/website/website.component'
import { RegisterComponent } from './register/register.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { UsermgmtComponent } from './usermgmt/usermgmt.component'

const redirectUnatuthorizedToLogin = () => redirectUnauthorizedTo(['login'])
const redirectLoggedInToShops = () => redirectLoggedInTo(['shops'])

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'recruitment',
    component: RecruitmentComponent,
  },
  {
    path: 'billets',
    component: BilletsComponent,
  },
  {
    path: 'calender',
    component: CalenderComponent,
  },
  {
    path: 'unitphotos',
    component: UnitPhotosComponent,
  },
  {
    path: 'quickrefrencedocuments',
    component: QRDComponent,
  },
  {
    path: 'login',
    component: ShopsLoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'usermgmt',
    component: UsermgmtComponent,
  },
  {
    path: 'shops',
    component: ShopsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          {
            path: 'admin',
            component: AdminComponent,
          },
          {
            path: 'home',
            component: HomeComponent,
          },
          { path: 'website', component: WebsiteComponent },
        ],
      },
      { path: 'not-authorized/:page', component: NotAuthorizedComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
  { path: 'test', component: TestComponent },
  {
    path: '**',
    component: NotFoundComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
