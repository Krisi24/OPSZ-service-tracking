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
    this.description.setValue(this.report.description);
    this.start_date.setValue(this.report.start_date);
    this.end_date.setValue(this.report.end_date);
  }

  updateReport(){
    this.new_report.emit({
      description: this.description.value,
      start_date: this.start_date.value,
      end_date: this.end_date.value,
      ID: this.report.ID
    });
  }

  close(){
    this.new_report.emit(null);
  }

}
