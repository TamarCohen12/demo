import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Implement2Component } from './implement2.component';

describe('Implement2Component', () => {
  let component: Implement2Component;
  let fixture: ComponentFixture<Implement2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Implement2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Implement2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
