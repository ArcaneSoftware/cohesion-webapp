import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceTypeDetailComponent } from './source-type-detail.component';

describe('SourceTypeDetailComponent', () => {
    let component: SourceTypeDetailComponent;
    let fixture: ComponentFixture<SourceTypeDetailComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SourceTypeDetailComponent],
        });
        fixture = TestBed.createComponent(SourceTypeDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
