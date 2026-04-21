import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumerosVistazoComponent } from './numeros-vistazo.component';

describe('NumerosVistazoComponent', () => {
  let component: NumerosVistazoComponent;
  let fixture: ComponentFixture<NumerosVistazoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumerosVistazoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumerosVistazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
