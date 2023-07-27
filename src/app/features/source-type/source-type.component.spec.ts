import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceTypeComponent } from './source-type.component';

describe('SourceComponent', () => {
  let component: SourceTypeComponent;
  let fixture: ComponentFixture<SourceTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SourceTypeComponent],
    });
    fixture = TestBed.createComponent(SourceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
