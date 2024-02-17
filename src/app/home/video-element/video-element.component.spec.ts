import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoElementComponent } from './video-element.component';

describe('VideoElementComponent', () => {
  let component: VideoElementComponent;
  let fixture: ComponentFixture<VideoElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
