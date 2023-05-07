import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Gerente } from 'src/app/shared/model/gerente';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-inserir-gerente',
  templateUrl: './inserir-gerente.component.html',
  styleUrls: ['./inserir-gerente.component.css']
})
export class InserirGerenteComponent implements OnInit {
  @ViewChild ('formGerente') formGerente! : NgForm;
  gerente! : Gerente;

  constructor (
    private adminService : AdminService,
    private router : Router
  ){}

  ngOnInit(): void {
      this.gerente = new Gerente();
  }

  inserir(): void {
    if(this.formGerente.form.valid) {
      this.adminService.inserir(this.gerente);
      this.router.navigate(['/admin'])
    }
  }
}
