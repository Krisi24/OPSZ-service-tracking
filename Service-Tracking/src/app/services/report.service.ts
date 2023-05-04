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

  getAll() {
    return this.afs.collection<Report>(this.collectionName).valueChanges({ idField: 'ID' });
  }

  update(ID: string, new_report: Report) {
    return this.afs.collection<Report>(this.collectionName).doc(ID).set(new_report);
  }

  delete(ID: string) {
    return this.afs.collection<Report>(this.collectionName).doc(ID).delete();
  }

}
