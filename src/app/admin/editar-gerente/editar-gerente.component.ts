import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Gerente } from 'src/app/shared/model/gerente';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-editar-gerente',
  templateUrl: './editar-gerente.component.html',
  styleUrls: ['./editar-gerente.component.css']
})
export class EditarGerenteComponent {
  @ViewChild ('formGerente') formGerente! : NgForm;
  gerente! : Gerente;

  constructor (
    private adminService : AdminService,
    private route : ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(): void {
      let id = +this.route.snapshot.params['id'];
      const res = this.adminService.buscarPorId(id);
      if(res !== undefined) {
        this.gerente = res;
      }
      else {
        throw new Error("Gerente não encontrado. id = "+id);
      }
  }

  atualizar(): void {
    if(this.formGerente.form.valid) {
      this.adminService.atualizar (this.gerente);
      this.router.navigate(['/admin'])
    }
  }
} 
