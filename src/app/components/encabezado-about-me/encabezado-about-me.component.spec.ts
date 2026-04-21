import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoAboutMeComponent } from './encabezado-about-me.component';

describe('EncabezadoAboutMeComponent', () => {
  let component: EncabezadoAboutMeComponent;
  let fixture: ComponentFixture<EncabezadoAboutMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncabezadoAboutMeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncabezadoAboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
