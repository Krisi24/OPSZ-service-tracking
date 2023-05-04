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

  reports: any = undefined;
  show_update_report: boolean = false;
  old_report: Report | undefined = undefined;

  description = new FormControl('');
  start_date = new FormControl(new Date());
  end_date = new FormControl(new Date());

  new_description = new FormControl('');
  new_start_date = new FormControl(new Date());
  new_end_date = new FormControl(new Date());
  
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
      serviceID: localStorage.getItem('sericeID') as string
    }
    this.reportService.create(report).then( res => {
      alert("Report is successfully created!")
    })
  }

  deleteReport(report: Report){
    if( !report.ID ) {
      alert("deleted is unsuccessful");
      return;
    }
    this.reportService.delete(report.ID).then( () => {
      alert("deleted successful");
    });
  }

  updateReport(report: Report){
    this.new_description.setValue(report.description);
    this.new_start_date.setValue(report.start_date);
    this.new_end_date.setValue(report.end_date);

    this.show_update_report = true;
  }

  closeUpdateReport(){
    this.show_update_report = false;
  }


}
