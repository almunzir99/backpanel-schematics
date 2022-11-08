import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { <%= classify(normalize(name)) %>RoutingModule } from './<%= normalize(name) %>-routing.module';
import { <%= classify(normalize(name)) %>Component } from './<%= normalize(name) %>.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    <%= classify(normalize(name)) %>Component
  ],
  imports: [
    CommonModule,
    <%= classify(normalize(name)) %>RoutingModule,
    MatDialogModule,
    SharedModule,
    MatButtonModule,
    MatRippleModule,
    MatIconModule
  ]
})
export class CustomersModule { }
