import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
 {
  path:'',
  component:DashboardComponent,
  children: [{      path:'',      redirectTo:'home',      pathMatch:'full'
    },
    {
      path: 'home',
      loadChildren: () => import('./pages/home/home.module').then(c => c.HomeModule)
    },
    {
      path: 'admins',
      loadChildren: () => import('./pages/admins/admins.module').then(c => c.AdminsModule)
    },
    {
      path:'taxes',
      loadChildren: () => import('./pages/taxes/taxes.module').then(c => c.TaxesModule)
    },
    {
      path:'taxes',
      loadChildren: () => import('./pages/taxes/taxes.module').then(c => c.TaxesModule)
    },
    {
      path:'taxes',
      loadChildren: () => import('./pages/taxes/taxes.module').then(c => c.TaxesModule)
    }
]
 }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
