import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { PoLookupComponent, PoNotificationService, PoUploadComponent, PoUploadFileRestrictions } from '@po-ui/ng-components';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  @ViewChild('upload', { static: true }) upload!: PoUploadComponent;
  @ViewChild('lookup', { static: true }) lookup!: PoLookupComponent;

  selectedValue: any = null; 

  condutor!: string;

  url: string = `${environment.host}checklist/upload`;

  filterService: string = `${environment.host}agendamento/condutor`;

  columns = [
    {
      property: "cdn_funcionario",
      label: "Matrícula"
    },
    {
      property: "nom_pessoa_fisic",
      label: "Nome"
    }
  ];

  restrictions: PoUploadFileRestrictions = { 
    maxFileSize: 1048576,
    allowedExtensions: ['.pdf', '.doc', '.xlsx', '.png', '.jpg', '.jpeg']
  };

  constructor(public poNotification: PoNotificationService) {}

  fileUploadError(error:HttpErrorResponse) {
    const errorMessage = error ? error.message : 'Falha no envio do arquivo';
    this.poNotification.error(errorMessage);
    this.clearForm();
  }

  fileUploadSuccess(response:HttpResponse<1>) {
    this.poNotification.success('Arquivo enviado com sucesso');
    this.clearForm();
  }

  sendFile() {
    this.upload.sendFiles();
  }

  onSelectedCondutor(event: any) {
    this.condutor = event.value;
  }
  
  onSendFile(event: any) {
    event.data = this.condutor;
  }

  clearForm() {
    this.upload.clear();
    this.selectedValue = null;
  }

  isFormValid(): boolean {
    return !!this.selectedValue && this.upload.currentFiles.length > 0;
  }
}
