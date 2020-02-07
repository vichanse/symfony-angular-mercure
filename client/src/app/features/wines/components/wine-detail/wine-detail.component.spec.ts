import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WineDetailComponent } from './wine-detail.component';

describe('WineDetailComponent', () => {
  let component: WineDetailComponent;
  let fixture: ComponentFixture<WineDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WineDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
