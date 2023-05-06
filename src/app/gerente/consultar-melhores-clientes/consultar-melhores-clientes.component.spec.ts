import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarMelhoresClientesComponent } from './consultar-melhores-clientes.component';

describe('ConsultarMelhoresClientesComponent', () => {
  let component: ConsultarMelhoresClientesComponent;
  let fixture: ComponentFixture<ConsultarMelhoresClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarMelhoresClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarMelhoresClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
