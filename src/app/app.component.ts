import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './providers/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router, db: AngularFireDatabase) {
    authService.afAuth.authState.subscribe(
      (auth) => {
        if (auth == null) { }
        else {
          let user = auth.providerData[0];
          user['origUid'] = auth.uid;
          db.object(`users/${auth.uid}`).set(user);
        }
      }
    );
  }
}
