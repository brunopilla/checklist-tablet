import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: ''
})
export class HelpComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    const pdfPath = 'assets/html.agendamento-veiculos.pdf';

    window.open(pdfPath, '_blank');
  }
}
