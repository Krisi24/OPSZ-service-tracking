import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static colletcionName: string = 'Users' 

  constructor(private afs: AngularFirestore) { }

  create(): void {
    this.afs.collection<User>
  }

}
