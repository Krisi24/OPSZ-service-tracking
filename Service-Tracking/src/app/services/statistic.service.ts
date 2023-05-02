import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Assosiation } from '../models/Association';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private colletcionName: string = 'association' 

  constructor(private afs: AngularFirestore) { }

  create(association: Assosiation) {
    return this.afs.collection<Assosiation>(this.colletcionName).add(association); // .doc(ass.id).set(ass);
  }
}
