import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import { reject } from 'q';

@Injectable()
export class AuthenticationService {
  user: Observable<firebase.User>;
  constructor(public afAuth: AngularFireAuth, private toastr: ToastrService) {
    this.user = afAuth.authState;
  }
  // loginWithFacebook() {
  //   return new Promise((resolve, reject) => {
  //     const provider = new firebase.auth.FacebookAuthProvider();
  //     this.afAuth.auth.signInWithPopup(provider)
  //     .catch(error => {
  //       reject(error);
  //     })
  //     .then(result => {
  //       resolve(result);
  //     });
  //   });
  // }
  // loginWithGoogle() {
  //   return new Promise((resolve, reject) => {
  //     const provider = new firebase.auth.GoogleAuthProvider();
  //     this.afAuth.auth.signInWithPopup(provider)
  //     .catch(error => {
  //       reject(error);
  //     })
  //     .then(result => {
  //       resolve(result);
  //     });
  //   });
  // }
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
}
