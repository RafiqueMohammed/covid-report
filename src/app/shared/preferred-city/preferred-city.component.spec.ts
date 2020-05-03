import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferredCityComponent } from './preferred-city.component';

describe('PreferredCityComponent', () => {
  let component: PreferredCityComponent;
  let fixture: ComponentFixture<PreferredCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferredCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferredCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
