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

  obs: any = [];

  constructor(private association: AssociationService,
     private statisticsService: StatisticsService,
     private reportService: ReportService,
     private userService: UserService
     ) { }

  ngOnInit(): void {
    this.obs.push(
      this.association.getAssociationList().subscribe( (res: any) => {
        this.associations = res;
      })
    );
    this.obs.push(
      this.statisticsService.get('Active members').subscribe( (res: any) => {
        if( this.active_members === null){
          this.active_members = res[0];
          this.refreshStatistic();
        } else {
          this.active_members = res[0]; 
        }
      })
    );
  }

  ngOnChanges(): void{
    //this.refreshStatistic();
  }
  ngOnDestroy(): void{
    this.obs.forEach((ob: any) => {
      ob.unsubscribe();
    });
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
    let users: any;
    let reports: any = undefined;

    let sub = this.userService.getAllUsers().subscribe((res: any) => {
      users = res;
    });
    this.obs.push(sub);

    sub = this.reportService.getAll().subscribe((res: any) => {
      if(reports === undefined){
        reports = res;
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
            max_value: users.length,
            ID: this.active_members.ID,
            description: (!!this.active_members.description ? this.active_members.description : '' ),
          }
          this.statisticsService.update(fresh_statistic).then();
        }
      } else {
        reports = res;
      }
    });
    this.obs.push(sub);
  }


}
