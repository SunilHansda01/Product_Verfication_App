import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProducts } from './upload-products';

describe('UploadProducts', () => {
  let component: UploadProducts;
  let fixture: ComponentFixture<UploadProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadProducts],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadProducts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
