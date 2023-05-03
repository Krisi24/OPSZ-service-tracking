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
    return this.afs.collection<Assosiation>(this.collectionName).add(association); // .doc(ass.id).set(ass);
  }
  asdcreate(association: Assosiation) {
    return this.afs.collection<Assosiation>(this.collectionName, ref => ref.where('imageId', '==', 1).orderBy('date', 'asc')).valueChanges();
  }

  getCommentsByImageId(imageId: string) {
    return this.afs.collection<Comment>(this.collectionName, ref => ref.where('imageId', '==', imageId).orderBy('date', 'asc')).valueChanges();
  }
}
