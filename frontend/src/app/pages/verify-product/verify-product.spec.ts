import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyProduct } from './verify-product';

describe('VerifyProduct', () => {
  let component: VerifyProduct;
  let fixture: ComponentFixture<VerifyProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyProduct],
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
