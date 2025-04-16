import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpopComponent } from './kpop.component';

describe('KpopComponent', () => {
  let component: KpopComponent;
  let fixture: ComponentFixture<KpopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
