import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaHabilidadComponent } from './carta-habilidad.component';

describe('CartaHabilidadComponent', () => {
  let component: CartaHabilidadComponent;
  let fixture: ComponentFixture<CartaHabilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaHabilidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaHabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
