import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSpinnerComponent } from './show-spinner.component';

describe('ShowSpinnerComponent', () => {
  let component: ShowSpinnerComponent;
  let fixture: ComponentFixture<ShowSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
