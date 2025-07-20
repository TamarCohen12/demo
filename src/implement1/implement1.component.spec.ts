import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Implement1Component } from './implement1.component';

describe('Implement1Component', () => {
  let component: Implement1Component;
  let fixture: ComponentFixture<Implement1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Implement1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Implement1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
