import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-report',
  templateUrl: './update-report.component.html',
  styleUrls: ['./update-report.component.scss']
})
export class UpdateReportComponent implements OnInit {

  // old report
  @Input() report: any;

  @Output() new_report = new EventEmitter();

  description = new FormControl('');
  start_date = new FormControl(new Date());
  end_date = new FormControl(new Date());

  constructor() { }

  ngOnInit(): void {
  }

  updateReport(){
    
  }

  close(event: any){
    this.new_report.emit();
  }

}
