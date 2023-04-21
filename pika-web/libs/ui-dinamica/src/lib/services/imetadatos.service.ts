import { Entidad } from '@pika-web/pika-cliente-api';
export interface IMetadatosService {
  ObtieneMetadatosEntidad(_entidadId: string): Entidad;
}
