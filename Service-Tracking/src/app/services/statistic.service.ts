import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Assosiation } from '../models/Association';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private collectionName: string = 'association' 

  constructor(private afs: AngularFirestore) { }

  create(association: Assosiation) {
    return this.afs.collection<Assosiation>(this.collectionName).add(association);
  }

  getAssociationList() {
    return this.afs.collection<Comment>(this.collectionName).valueChanges();
  }
}
