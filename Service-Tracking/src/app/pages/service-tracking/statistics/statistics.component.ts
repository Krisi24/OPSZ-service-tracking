import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StatisticService } from "../../../services/statistic.service";
import { Assosiation } from 'src/app/models/Association';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  name =  new FormControl('');
  born =  new FormControl(new Date);

  displayedColumns: string[] = ['name', 'born'];
  associations: Assosiation[] = [];

  constructor(private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.statisticService.getAssociationList().subscribe( (res: any) => {
      this.associations = res;
    });
  }


  addAssociation(){
    if(!this.name.value || !this.born.value) return; 

    const new_association: Assosiation = {
      name: this.name.value,
      born: this.born.value
    }
    this.statisticService.create(new_association).then().catch(() => { 
      alert("error");
    });
  }

}
