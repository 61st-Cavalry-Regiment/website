import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BilletsComponent } from './billets/billets.component';
import { CalenderComponent } from './calender/calender.component';
import { TestGuard } from './guards/test.guard';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { QRDComponent } from './qrd/qrd.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { ShopsLoginComponent } from './shops-login/shops-login.component';
import { ShopsComponent } from './shops/shops.component';
import { UnitPhotosComponent } from './unit-photos/unit-photos.component';

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
  { path: 'login', component: ShopsLoginComponent },
  { path: 'shops', component: ShopsComponent, canActivate: [TestGuard] },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
