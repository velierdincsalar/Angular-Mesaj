import { HomeComponent } from './components/home/home.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { HaberlerComponent } from './components/haberler/haberler.component';
import { UyeComponent } from './components/uye/uye.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
 
  {
    path: 'kategoriler',
    component: KategoriComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'haberler',
    component: HaberlerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'haberler/:katId',
    component: HaberlerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'uyeler',
    component: UyeComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
