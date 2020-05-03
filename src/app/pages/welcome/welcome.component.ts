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
  constructor(private session: Session,private router:Router) { }

  ngOnInit(): void {
  }

  enterName(e: any) {
    this.guestName = e.target.value;
    console.log(e.target.value, 'e');
  }
  saveSession() {
    this.session.setFirstTimeVisit(false);
    this.session.setGuestName(name);
    this.router.navigateByUrl('');
  }
}
