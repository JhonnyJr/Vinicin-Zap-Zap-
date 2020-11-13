import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';

interface User { 
  uid: string;
  email: string;
  photoUrl?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {
  user: Observable<User>
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { 
    this.user = this.afAuth.authState.pipe(u => {
      if (u) {
        return this.afs.doc<User>(`users/${this.user}`).valueChanges();
      }
      else {
        return Observable.of(null)
      }
    })
  }

  emailSignIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(() => console.log("LOGADASSO KKKKKKK"))
    .catch(error => console.log(error.message)) 
  }

  signOut() {
    return this.afAuth.auth.signOut()
    .then(() => {
      this.router.navigate(['/'])
    })
  }
}
