import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchapiComponent } from './searchapi.component';

describe('SearchapiComponent', () => {
  let component: SearchapiComponent;
  let fixture: ComponentFixture<SearchapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchapiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
