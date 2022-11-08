import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { <%= classify(normalize(name)) %>Component } from './<%= normalize(name) %>.component';

const routes: Routes = [
  {
    path:'',
    component:<%= classify(normalize(name)) %>Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class <%= classify(normalize(name)) %>RoutingModule { }
