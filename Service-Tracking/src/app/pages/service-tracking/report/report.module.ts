import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';

import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { UpdateReportComponent } from './update-report/update-report.component'


@NgModule({
  declarations: [
    ReportComponent,
    UpdateReportComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
  ]
})
export class ReportModule { }
