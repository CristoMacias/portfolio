/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoTrabajoComponent } from './metodo-trabajo.component';

describe('MetodoTrabajoComponent', () => {
  let component: MetodoTrabajoComponent;
  let fixture: ComponentFixture<MetodoTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetodoTrabajoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetodoTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
