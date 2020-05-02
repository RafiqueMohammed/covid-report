import { Component } from '@angular/core';
import { Session } from './providers/application/session/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private session: Session, private router: Router) {
    if (this.session.isFirstTime()) {
      this.router.navigateByUrl('welcome');
    }
  }
}
