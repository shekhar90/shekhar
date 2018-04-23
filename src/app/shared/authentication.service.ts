import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import { reject } from 'q';
import { RoutingService } from '../shared/routing.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { User } from '../shared/user';


@Injectable()
export class AuthenticationService {
  user: Observable<firebase.User>;
  userList: AngularFireList<any>;
  authenticated = false;
  constructor(
    public afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private routingService: RoutingService,
    private firebase: AngularFireDatabase
  ) {
    this.user = afAuth.authState;
  }
  getProvider(providerName: string) {
    let provider;
    switch (providerName) {
      case 'facebook':
        provider =  new firebase.auth.FacebookAuthProvider();
        break;
      case 'google':
        provider =  new firebase.auth.GoogleAuthProvider();
        break;
      case 'twitter':
        provider =  new firebase.auth.TwitterAuthProvider();
        break;
      case 'github':
        provider =  new firebase.auth.GithubAuthProvider();
        break;
      default:
        provider = 'error';
    }
    return provider;
  }
  routeToPageAfterRedirectResult(route) {

  }
  authenticateWith(providerName) {
    return new Promise((resolve, reject) => {
      let provider = this.getProvider(providerName);
      this.afAuth.auth.signInWithRedirect(provider)
      .catch(error => {
        reject(error);
      })
      .then(result => {
        resolve(result);
      });
      this.afAuth.auth.getRedirectResult().then(result => {
        this.authenticated = true;
        this.routingService.goto('/practice');
      })
    });
  }
  loginWithEmailPassword(email, password) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email, password)
      .catch(error => {
        reject(error);
      })
      .then(result => {
        resolve(result);
      });
    });
  }
  signupWithEmailPassword(email, password) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .catch(error => {
          reject(error);
        })
      .then(result => {
          resolve(result);
        });
    });
  }
  logout() {
    let authContext = this;
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signOut()
      .catch(error => {
        reject(error);
      })
      .then(() => {
        authContext.authenticated = false;
        resolve();
      });
    });
  }

  getData() {
    this.userList = this.firebase.list('user');
    return this.userList;
  }
  insertUser(user: User) {
    this.userList.push({
      firstName: user.firstName,
      lastName: user.lastName
    });
  }
  updateUser(user: User) {
    this.userList.update(user.$key, {
      firstName: user.firstName,
      lastName: user.lastName
    });
  }
  // deleteEmployee($key: string) {
  //   this.employeeList.remove($key);
  // }
}
// "rules": {
//   "users": {
//     "$uid": {
//       ".read": "auth.uid == $uid",
//       ".write": 'auth.uid == $uid',
//       ".validate": "newData.exists()"
//     }
//   }
// }
// const rootRef = firebase.database().ref();
// const usersRef = rootRef.child('users');
// const uid = '1';
// const daveRef = usersRef.child(uid);
// daveRef.update({namr: 'Dave'})

// server variables
// 1. auth
// 2. database
// 3. new data
// 4. now
// 5. root
// 6. $uid
