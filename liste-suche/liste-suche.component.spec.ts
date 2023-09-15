import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSucheComponent } from './liste-suche.component';

describe('ListeSucheComponent', () => {
  let component: ListeSucheComponent;
  let fixture: ComponentFixture<ListeSucheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeSucheComponent]
    });
    fixture = TestBed.createComponent(ListeSucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
