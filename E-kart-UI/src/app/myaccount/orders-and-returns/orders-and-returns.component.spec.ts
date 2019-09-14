import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAndReturnsComponent } from './orders-and-returns.component';

describe('OrdersAndReturnsComponent', () => {
  let component: OrdersAndReturnsComponent;
  let fixture: ComponentFixture<OrdersAndReturnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersAndReturnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersAndReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
