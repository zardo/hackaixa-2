export class Mensagem {
  conteudo: string;
  timestamp: Date;
  isBot: boolean;

  constructor(conteudo: string, isBot: boolean, timestamp?: Date) {
    this.conteudo = conteudo;
    this.timestamp = timestamp;
    this.isBot = isBot;
  }
}
