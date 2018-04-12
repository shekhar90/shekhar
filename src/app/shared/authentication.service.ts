import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import { reject } from 'q';
import { RoutingService } from '../shared/routing.service';

@Injectable()
export class AuthenticationService {
  user: Observable<firebase.User>;
  constructor(
    public afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private routingService: RoutingService
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
      const provider = this.getProvider(providerName);
      this.afAuth.auth.signInWithRedirect(provider)
      .catch(error => {
        reject(error);
      })
      .then(result => {
        resolve(result);
      });
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
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signOut()
      .catch(error => {
        reject(error);
      })
      .then(result => {
        resolve(result);
      });
    });
  }
  // employeeList: AngularFireList<any>;
  // selectedEmployee: Employee = new Employee();
  // constructor(private firebase: AngularFireDatabase) { }
  // getData() {
  //   this.employeeList = this.firebase.list('employees');
  //   return this.employeeList;
  // }
  // insertEmployee(employee: Employee) {
  //   this.employeeList.push({
  //     name: employee.name,
  //     position: employee.position,
  //     office: employee.office,
  //     salary: employee.salary
  //   });
  // }
  // updateEmployee(employee: Employee) {
  //   this.employeeList.update(employee.$key, {
  //     name: employee.name,
  //     position: employee.position,
  //     office: employee.office,
  //     salary: employee.salary
  //   });
  // }
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
