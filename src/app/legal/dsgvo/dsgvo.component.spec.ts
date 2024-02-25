import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DSGVOComponent } from './dsgvo.component';

describe('DSGVOComponent', () => {
  let component: DSGVOComponent;
  let fixture: ComponentFixture<DSGVOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DSGVOComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DSGVOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
