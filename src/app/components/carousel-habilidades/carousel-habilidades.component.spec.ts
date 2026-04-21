import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselHabilidadesComponent } from './carousel-habilidades.component';

describe('CarouselHabilidadesComponent', () => {
  let component: CarouselHabilidadesComponent;
  let fixture: ComponentFixture<CarouselHabilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselHabilidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselHabilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
