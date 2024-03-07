import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleCRUDComponent } from './example-crud.component';

describe('ExampleCRUDComponent', () => {
  let component: ExampleCRUDComponent;
  let fixture: ComponentFixture<ExampleCRUDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleCRUDComponent]
    });
    fixture = TestBed.createComponent(ExampleCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
