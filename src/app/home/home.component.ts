import { Component, OnInit } from '@angular/core';
import { PoGaugeRanges } from '@po-ui/ng-components';
import { HomeService } from './veiculos.service';
import { Veiculo } from './veiculos.model';
import { Agendamento } from './agendamento.model';
import { AgendamentosService } from './agendamentos.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  veiculos: Veiculo[] = [];
  agendamentos: Agendamento[] = [];

  tableColumns = [
    { property: 'prev_data_inic', label: 'Data Saída', type: 'date', format: 'dd/MM/yyyy' },
    { property: 'prev_hora_inic', label: 'Hora Saída' },
    { property: 'prev_data_fin', label: 'Data Retorno', type: 'date', format: 'dd/MM/yyyy' },
    { property: 'prev_hora_fin', label: 'Hora Retorno' },
    { property: 'placa', label: 'Placa' },
    { property: 'modelo', label: 'Veiculo' },
    { property: 'nome_condutor', label: 'Condutor' },
  ];

  calendar: Date;
  event: string | undefined;

  constructor(private homeService: HomeService, private agendamentoService: AgendamentosService) {
    this.calendar = new Date();
    this.calendar.setDate(this.calendar.getDate() - 1);
    this.onDateChange(this.calendar);
    this.calendar.setDate(this.calendar.getDate() + 1);
  }
  
  ngOnInit() {
    this.homeService.getVeiculos().subscribe((veiculos) => {
      this.veiculos = veiculos;
    });
  }

   turnoverRanges: Array<PoGaugeRanges> = [
    { from: 0.8, to: 1.5, label: 'E', color: 'color-07' },
    { from: 1.5, to: 2.5, label: '1/4', color: 'color-08' },
    { from: 2.5, to: 3.5, label: '1/2', color: 'color-09' },
    { from: 3.5, to: 4.5, label: '3/4', color: 'color-10' },
    { from: 4.5, to: 5.2, label: 'F', color: 'color-11' }   
  ];

  getStatusTagConfig(disponivel: boolean) {
    return {
      value: disponivel ? 'Disponível' : 'Em Uso',
      color: disponivel ? '#07c207' : '#ff0000' 
    };
  }

  onDateChange(event: any) {
    if (event) {
      let date = new Date(event); 
      date.setDate(date.getDate() + 1);
      const selectedDate = this.formatDate(date);
      this.agendamentoService.getAgendamentosPorData(selectedDate).subscribe((agendamentos) => {
        this.agendamentos = agendamentos;
      });
    }
  }
   
  formatDate(date: Date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }
}  
  


  
