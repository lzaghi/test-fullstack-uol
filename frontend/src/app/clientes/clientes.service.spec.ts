import { TestBed } from '@angular/core/testing';

import { ClientesService } from './clientes.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClientesService', () => {
  let service: ClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
