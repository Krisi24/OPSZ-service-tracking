import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Statistic } from '../models/Statistic';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  
  private collectionName: string = 'Statistics' 

  constructor(private afs: AngularFirestore) { }

  create(new_report: Statistic) {
    return this.afs.collection<Statistic>(this.collectionName).add(new_report);
  }

  get(name: string) {
    return this.afs.collection<Statistic>(this.collectionName,  ref => ref.where('name', '==', name)).valueChanges({ idField: 'ID' });
  }

  update(statistic: Statistic) {
    return this.afs.collection<Statistic>(this.collectionName).doc(statistic.ID).update(statistic);
  }

  updateByName(statistic: Statistic) {
    return this.afs.collection<Statistic>(this.collectionName).doc(statistic.name).update(statistic);
  }

  delete(statistic: Statistic) {
    return this.afs.collection<Statistic>(this.collectionName).doc(statistic.ID).delete();
  }

}
