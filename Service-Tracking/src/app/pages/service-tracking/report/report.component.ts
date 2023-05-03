import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Report } from 'src/app/models/Report';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private reportService: ReportService) { }

  reports: any;

  description = new FormControl('');
  start_date = new FormControl(new Date());
  end_date = new FormControl(new Date());

  ngOnInit(): void {
    this.reportService.getAll().subscribe( (res: any) => {
      this.reports = res;
    });
  }

  createReport(){
    const report: Report = {
      description: this.description?.value as string,
      start_date: this.start_date?.value as Date,
      end_date: this.end_date?.value as Date,
    }
    this.reportService.create(report).then( res => {
      console.log("AAAAAAAAA", res);
    })
  }


}
