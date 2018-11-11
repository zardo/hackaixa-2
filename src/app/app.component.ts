/// <reference types="@types/googlemaps" />

import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Mensagem} from './models/mensagem';
import {DialogflowService} from './services/dialogflow.service';
import {Mapa} from './models/map';
import {animate, style, transition, trigger} from '@angular/animations';
import LatLngBounds = google.maps.LatLngBounds;

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

  constructor(private dialogFlowService: DialogflowService) {
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

    this.dialogFlowService.getResponse('ola').subscribe(this.receberMensagemBot.bind(this));
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
        mensagem.speech.forEach((speech) => {
          if (speech !== '') {
            this.mensagens.push(new Mensagem(speech, true, dialogflow.timestamp));
          }
        });
      } else {
        if (mensagem.speech !== '') {
          this.mensagens.push(new Mensagem(mensagem.speech, true, dialogflow.timestamp));
        }
      }
    });
  }

}
