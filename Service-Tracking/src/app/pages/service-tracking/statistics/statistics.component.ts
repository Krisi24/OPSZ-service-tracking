import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AssociationService } from "../../../services/association.service";
import { StatisticsService } from "../../../services/statistics.service";
import { ReportService } from "../../../services/report.service";
import { UserService } from "../../../services/user.service";
import { Assosiation } from 'src/app/models/Association';
import { Statistic } from 'src/app/models/Statistic';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnChanges, OnDestroy {

  name =  new FormControl('', [Validators.required]);
  born =  new FormControl(new Date, [Validators.required]);

  displayedColumns: string[] = ['name', 'born'];
  associations: Assosiation[] = [];
  active_members: Statistic | null = null;

  constructor(private association: AssociationService,
     private statisticsService: StatisticsService,
     private reportService: ReportService,
     private userService: UserService
     ) { }

  ngOnInit(): void {
    this.association.getAssociationList().subscribe( (res: any) => {
      this.associations = res;
    });
    this.statisticsService.get('Active members').subscribe( (res: any) => {
      this.active_members = res[0];
      this.refreshStatistic();
    });
  }

  ngOnChanges(): void{
    //this.refreshStatistic();
  }
  ngOnDestroy(): void{
    //
  }

  addAssociation(){
    if(!this.name.value || !this.born.value){
      alert("You have to fill all the fields");
      return;
    } 

    const new_association: Assosiation = {
      name: this.name.value,
      born: this.born.value
    }
    this.association.create(new_association).then().catch(() => { 
      alert("error");
    });
  }

  refreshStatistic(){
    let users: any = [];
    let reports: any = [];

    this.userService.getAllUsers().subscribe((res: any) => {
      res.forEach( (user: any) => {
        users.push({
          serviceID: user.serviceID,
          name: user.name
        });
      });
    });
    this.reportService.getAll().subscribe((res: any) => {
      res.forEach( (user: any) => {
        reports.push({
          serviceID: user.serviceID
        });
      });
    });

    if(this.active_members != null){
      let actives: number = 0;
      users.forEach((user: any) => {
        for (const report of reports) {
          if (user.serviceID === report.serviceID) {
            actives += 1;
            break;
          }
        }
      });
      
      const fresh_statistic: Statistic = {
        name: this.active_members.name,
        value: actives,
        max_value: users.length as number,
        ID: this.active_members.ID,
        description: (!!this.active_members.description ? this.active_members.description : '' ),
      }
      console.log("valami történt");
      this.statisticsService.update(fresh_statistic).then();
    }
    
  }
}
