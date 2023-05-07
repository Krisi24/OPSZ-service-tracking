import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Report } from 'src/app/models/Report';
import { ReportService } from 'src/app/services/report.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {

  constructor(private reportService: ReportService, private userService: UserService) { }

  reports: any = undefined;
  show_update_report: boolean = false;
  old_report: Report | undefined = undefined;

  description = new FormControl('');
  start_date = new FormControl(new Date());
  end_date = new FormControl(new Date());

  new_description = new FormControl('');
  new_start_date = new FormControl(new Date());
  new_end_date = new FormControl(new Date());

  obs: any = [];
  
  ngOnInit(): void {
    this.obs[0] = this.userService.getLoggedUser(JSON.parse(localStorage.getItem('user') as string).email).subscribe( (res: any) => {
      localStorage.setItem('serviceID', res[0].serviceID as string);

      if(this.reports === undefined){
        this.obs[1] = this.reportService.getMyAll().subscribe( (res: any) => {
          this.reports = res;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.obs.forEach((ob: any) => {
      ob.unsubscribe();
    });
  }

  createReport(){
    const report: Report = {
      description: this.description?.value as string,
      start_date: this.start_date?.value as Date,
      end_date: this.end_date?.value as Date,
      serviceID: (localStorage.getItem('serviceID') as string)
    }
    this.reportService.create(report).then( res => {
      this.description.setValue('');
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
    this.old_report = {
      description: report.description,
      start_date: report.start_date,
      end_date: report.end_date,
      serviceID: (localStorage.getItem('serviceID') as string),
      ID: report.ID
    }

    this.show_update_report = true;
  }

  closeUpdateReport(event: any){
    this.show_update_report = false;
    if(event === null ){
      // todo
    } else {
      this.reportService.update(event).then(() =>{
        //Todo
      });
    }

  }


}
