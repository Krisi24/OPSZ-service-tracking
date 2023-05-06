import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Report } from '../models/Report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private collectionName: string = 'Reports' 

  constructor(private afs: AngularFirestore) { }

  create(new_report: Report) {
    return this.afs.collection<Report>(this.collectionName).add(new_report);
  }

  getMyAll() {
    return this.afs.collection<Report>(this.collectionName,  ref => ref.where('serviceID', '==', (localStorage.getItem('serviceID') as string))).valueChanges({ idField: 'ID' });
  }
  
  getAll() {
    return this.afs.collection<Report>(this.collectionName).valueChanges({ idField: 'ID' });
  }

  update(new_report: Report) {
    const report = {
      description: new_report.description,
      start_date: new_report.start_date,
      end_date: new_report.end_date,
      serviceID: (localStorage.getItem('serviceID') as string)
    }
    return this.afs.collection<Report>(this.collectionName).doc(new_report.ID).update(report);
  }

  delete(ID: string) {
    return this.afs.collection<Report>(this.collectionName).doc(ID).delete();
  }

}
