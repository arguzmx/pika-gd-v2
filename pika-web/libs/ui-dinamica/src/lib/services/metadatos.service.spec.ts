import { TestBed } from '@angular/core/testing';

import { MetadatosService } from './metadatos.service';

describe('MetadatosService', () => {
  let service: MetadatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetadatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
