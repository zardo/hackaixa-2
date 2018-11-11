/// <reference types="@types/googlemaps" />

import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Mensagem} from './models/mensagem';
import {DialogflowService} from './services/dialogflow.service';
import {Mapa} from './models/map';
import {animate, style, transition, trigger} from '@angular/animations';

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

    this.map.addListener('zoom_changed', () => {
      console.log('Zoom: ' + this.map.getZoom());
    });

    this.map.addListener('click', (e) => {
      console.log(e);
    });

    this.dialogFlowService.getResponse('ola').subscribe(dialogflow => {
      this.mensagens.push(new Mensagem(dialogflow.result.fulfillment.speech, true, dialogflow.timestamp));
    });
  }

  public enviarMensagem(event): void {
    if (event.key === 'Enter' && this.mensagem.conteudo !== '') {
      event.preventDefault();

      this.mensagem.timestamp = new Date();
      this.mensagens.push(this.mensagem);

      this.dialogFlowService.getResponse(this.mensagem.conteudo).subscribe(dialogflow => {
        this.mensagens.push(new Mensagem(dialogflow.result.fulfillment.speech, true, dialogflow.timestamp));
      });

      this.mensagem = new Mensagem('', false);
    }
  }
}
