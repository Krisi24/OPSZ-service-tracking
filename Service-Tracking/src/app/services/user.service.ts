import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private collectionName: string = 'Users' 

  constructor(private afs: AngularFirestore) { }

  create(new_user: User) {
    return this.afs.collection<User>(this.collectionName).add(new_user);
  }

  getLoggedUser(email: string) {
    return this.afs.collection<User>(this.collectionName, ref => ref.where('email', '==', email).limit(1) ).valueChanges();
  }

}
