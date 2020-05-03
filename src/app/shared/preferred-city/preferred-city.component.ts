import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../../providers/application/session/session.service';

@Component({
  selector: 'app-preferred-city',
  templateUrl: './preferred-city.component.html',
  styleUrls: ['./preferred-city.component.scss']
})
export class PreferredCityComponent implements OnInit {
  @Input() cityData: any = {};
  cityName = '';
  display: boolean = false;
  constructor(private session: Session) { }

  ngOnInit(): void {
    this.cityName = this.session.getPreferredCity();
    if (this.cityName) {
      this.display = true;
    } else {
      this.display = false;
    }
  }
  removePreferred() {
    this.session.setPreferredCity('');
    this.display = false;
  }

}
