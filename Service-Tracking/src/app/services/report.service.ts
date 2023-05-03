import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Report } from '../models/Report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private collectionName: string = ' Reports' 

  constructor(private afs: AngularFirestore) { }

  create(new_report: Report) {
    return this.afs.collection<Report>(this.collectionName).add(new_report);
  }

  getAll() {
    return this.afs.collection<Report>(this.collectionName).valueChanges();
  }

  update(report: Report) {
    return this.afs.collection<Report>(this.collectionName, ref => ref.where('Reports', '==', report) ).doc().set(report);
  }

  delete(id: string) {
    return this.afs.collection<Report>(this.collectionName).doc(id).delete();
  }

}
