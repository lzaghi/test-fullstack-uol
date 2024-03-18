import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
  alteracaoRegistros: EventEmitter<void> = new EventEmitter<void>();

  emitirAlteracaoRegistros(): void {
    this.alteracaoRegistros.emit();
  }
}
