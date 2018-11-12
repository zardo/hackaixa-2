/// <reference types="@types/googlemaps" />

import {AfterViewInit, Component, ElementRef, Inject, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Mensagem} from './models/mensagem';
import {DialogflowService} from './services/dialogflow.service';
import {Mapa} from './models/map';
import {animate, style, transition, trigger} from '@angular/animations';
import LatLngBounds = google.maps.LatLngBounds;
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: '0'}),
        animate('.5s ease-out', style({opacity: '1'})),
      ]),
    ]),
  ]
})
export class AppComponent implements OnInit, AfterViewInit {

  @Input()
  mensagens: Mensagem[] = [];

  mensagem = new Mensagem('', false);

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  @ViewChild('listaMensagens') private listaMensagens: ElementRef;
  @ViewChildren('itensMensagem') itensMensagem: QueryList<any>;

  constructor(private dialogFlowService: DialogflowService, public dialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.itensMensagem.changes.subscribe(e => {
      this.listaMensagens.nativeElement.scrollTop = this.listaMensagens.nativeElement.scrollHeight;
    });
  }

  ngOnInit() {
    const mapProp = {
      center: new google.maps.LatLng(-15.8267, -47.9218),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: Mapa.estilo
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    setInterval(() => {
      this.dialogFlowService.getResponse('meus bounds atuais são ' + this.map.getBounds()).subscribe(this.receberMensagemBot.bind(this));
    }, 3000);

    this.map.addListener('click', (e) => {
      if (e.placeId !== undefined) {
        this.dialogFlowService.getResponse('o ponto de interesse ' + e.placeId).subscribe(this.receberMensagemBot.bind(this));
      }
    });

    setTimeout(() => {
      const dialogRef = this.dialog.open(InicioDialogComponent, {
        width: '400px'
      });

      dialogRef.afterClosed().subscribe(result => {
        this.dialogFlowService.getResponse('ola').subscribe(this.receberMensagemBot.bind(this));
      });
    });
  }

  public enviarMensagem(event): void {
    if (event.key === 'Enter' && this.mensagem.conteudo !== '') {
      event.preventDefault();

      this.mensagem.timestamp = new Date();
      this.mensagens.push(this.mensagem);

      this.dialogFlowService.getResponse(this.mensagem.conteudo).subscribe(this.receberMensagemBot.bind(this));

      this.mensagem = new Mensagem('', false);
    }
  }

  private receberMensagemBot(dialogflow): void {
    dialogflow.result.fulfillment.messages.forEach((mensagem) => {
      if (mensagem.speech instanceof Array) {
        for (const speech of mensagem.speech) {
          if (speech !== '') {
            if (speech.startsWith('Aeee')) {
              const dialogRef = this.dialog.open(ParabensDialogComponent, {
                width: '400px'
              });

              dialogRef.afterClosed().subscribe(result => {
                this.dialogFlowService.getResponse('ola').subscribe(this.receberMensagemBot.bind(this));
              });
            }

            this.mensagens.push(new Mensagem(speech, true, dialogflow.timestamp));
          }
        }
      } else {
        if (mensagem.speech !== '') {
          if (mensagem.speech.startsWith('Aeee')) {
            const dialogRef = this.dialog.open(ParabensDialogComponent, {
              width: '400px'
            });

            dialogRef.afterClosed().subscribe(result => {
              this.dialogFlowService.getResponse('ola').subscribe(this.receberMensagemBot.bind(this));
            });
          }

          this.mensagens.push(new Mensagem(mensagem.speech, true, dialogflow.timestamp));
        }
      }
    });
  }

}

@Component({
  selector: 'app-inicio-dialog',
  template: '<h1 mat-dialog-title>Caça ao Tesouro Hackaixa</h1>' +
    '<div mat-dialog-content>' +
    '  <p>O jogo funciona assim: o bot dá uma dica e você precisa procurar o ponto no mapa até encontrá-lo.</p><p>Quando encontrar, ' +
    'clique no ponto do mapa.</p><p>Você também pode falar o nome do lugar pro bot que ele responde.</p><p>Boa sorte!</p>' +
    '</div>' +
    '<div mat-dialog-actions>' +
    '  <button mat-raised-button color="primary" (click)="onOkClick()">Beleza! Vamos lá!</button>' +
    '</div>',
})
export class InicioDialogComponent {

  constructor(public dialogRef: MatDialogRef<InicioDialogComponent>) {
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-parabens-dialog',
  template: '<h1 mat-dialog-title>Parabéns!</h1>' +
    '<div mat-dialog-content>' +
    '  <p>Você encontrou o tesouro Hackaixa.</p><p>Continue se divertindo, jogue novamente.</p>' +
    '</div>' +
    '<div mat-dialog-actions>' +
    '  <button mat-raised-button color="primary" (click)="onOkClick()">Jogar de novo!</button>' +
    '</div>',
})
export class ParabensDialogComponent {

  constructor(public dialogRef: MatDialogRef<InicioDialogComponent>) {
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

}
