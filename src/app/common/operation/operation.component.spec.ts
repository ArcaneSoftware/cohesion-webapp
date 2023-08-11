import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationComponent } from './operation.component';

describe('OperationBarComponent', () => {
    let component: OperationComponent;
    let fixture: ComponentFixture<OperationComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [OperationComponent],
        });
        fixture = TestBed.createComponent(OperationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
