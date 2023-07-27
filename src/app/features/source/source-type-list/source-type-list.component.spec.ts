import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SourceTypeListComponent } from './source-type-list.component';

describe('SourceTypeMainComponent', () => {
  let component: SourceTypeListComponent;
  let fixture: ComponentFixture<SourceTypeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SourceTypeListComponent],
    });
    fixture = TestBed.createComponent(SourceTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
