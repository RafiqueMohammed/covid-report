import { Component, OnInit } from '@angular/core';
import { Session } from '../../providers/application/session/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  guestName: string = '';
  title = 'Hey Stranger!';
  subtext = `What's your name?`;
  constructor(private session: Session, private router: Router) { }

  ngOnInit(): void {
    this.title = (this.session.getGuestName()) ? '' : 'Hey Stranger!';
    this.subtext = (this.session.getGuestName()) ? 'Enter your name' : `What's your name?`;
  }

  enterName(e: any) {
    this.guestName = e.target.value;
    console.log(e.target.value, 'e');
  }
  saveSession() {
    if (this.guestName) {
      this.session.setFirstTimeVisit(false);
      this.session.setGuestName(this.guestName);
    }

    this.router.navigateByUrl('');
  }
}
