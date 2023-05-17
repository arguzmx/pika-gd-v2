import { Injectable } from '@angular/core';
import { IMetadatosService } from './imetadatos.service';
import {
  Entidad,
  EntidadMockPagina,
  OrdenamientoLista,
  TipoDatos,
} from '@pika-web/pika-cliente-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MetadatosService implements IMetadatosService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dic: any[] = [];
  obj: any
  constructor(private http: HttpClient) { }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ObtieneMetadatosEntidad(_entidadId: string): Entidad {
    return {
      id: 'entidad-demo',
      nombre: 'i18-demo',
      endpointAPI: '',
      propiedades: [
        {
          id: 'id-Logico',
          nombre: 'i18n-Logico',
          requerida: true,
          buscable: true,
          ordenable: true,
          visible: true,
          tipo: TipoDatos.Logico,
          urlMacroCliente: './macro',
          valorDefault: 'true',
          configuracionTabular: {
            indice: 0,
            mostrarEnTabla: true,
            alternarEnTabla: true,
          },
        },
        {
          id: 'id-LogicoFalse',
          nombre: 'i18n-LogicoFalse',
          requerida: true,
          buscable: true,
          ordenable: true,
          visible: true,
          tipo: TipoDatos.Logico,
          urlMacroCliente: './macro',
          valorDefault: 'false',
          configuracionTabular: {
            indice: 0,
            mostrarEnTabla: true,
            alternarEnTabla: true,
          },
        },
        {
          id: 'id-ListaSeleccionSimple',
          nombre: 'i18n-ListaSeleccionSimple',
          requerida: true,
          buscable: true,
          ordenable: true,
          visible: true,
          tipo: TipoDatos.ListaSeleccionSimple,
          urlMacroCliente: './macro',
          valorDefault: 'B',
          configuracionTabular: {
            indice: 1,
            mostrarEnTabla: true,
            alternarEnTabla: true,
          },
          lista: {
            id: null,
            ordenamiento: OrdenamientoLista.Ninguno,
            datosRemotos: false,
            endpointBusqueda: false,
            endpoint: null,
            elementos: [
              {
                id: '1',
                nombre: 'Elemento A',
                valor: 'A',
                posicion: 1,
              },
              {
                id: '2',
                nombre: 'Elemento B',
                valor: 'B',
                posicion: 2,
              },
              {
                id: '3',
                nombre: 'Elemento C',
                valor: 'C',
                posicion: 0,
              },
              {
                id: '4',
                nombre: 'Elemento D',
                valor: 'D',
                posicion: 3,
              },
            ],
          },
        },
        {
          id: 'id-Fecha',
          nombre: 'i18n-Fecha',
          requerida: true,
          buscable: true,
          ordenable: true,
          visible: true,
          tipo: TipoDatos.Fecha,
          urlMacroCliente: './macro',
          valorDefault: '"2010-02-02T00:00:00"',
          configuracionTabular: {
            indice: 2,
            mostrarEnTabla: true,
            alternarEnTabla: true,
          },
          validadorFecha: {
            minimo: new Date('2001-01-01T00:00:00'),
            maximo: new Date('2028-12-31T00:00:00'),
          },
        },
        {
          id: 'id-FechaHora',
          nombre: 'i18n-FechaHora',
          requerida: true,
          buscable: true,
          ordenable: true,
          visible: true,
          tipo: TipoDatos.FechaHora,
          urlMacroCliente: './macro',
          valorDefault: '"2010-01-01T12:00:00"',
          configuracionTabular: {
            indice: 3,
            mostrarEnTabla: true,
            alternarEnTabla: true,
          },
          validadorFecha: {
            minimo: new Date('2001-01-01T00:00:00'),
            maximo: new Date('2028-12-31T23:29:59'),
          },
        },
        {
          id: 'id-Decimal',
          nombre: 'i18n-Decimal',
          requerida: true,
          buscable: true,
          ordenable: true,
          visible: true,
          tipo: TipoDatos.Decimal,
          urlMacroCliente: './macro',
          valorDefault: '10',
          configuracionTabular: {
            indice: 4,
            mostrarEnTabla: true,
            alternarEnTabla: true,
          },
          validadorNumerico: {
            minimo: -100.1,
            maximo: 100.1,
          },
        },
        {
          id: 'id-Entero',
          nombre: 'i18n-Entero',
          requerida: true,
          buscable: true,
          ordenable: true,
          visible: true,
          tipo: TipoDatos.Entero,
          urlMacroCliente: './macro',
          valorDefault: '-1',
          configuracionTabular: {
            indice: 5,
            mostrarEnTabla: true,
            alternarEnTabla: true,
          },
          validadorNumerico: {
            minimo: -10,
            maximo: 10,
          },
        },
        {
          id: 'id-Hora',
          nombre: 'i18n-Hora',
          requerida: true,
          buscable: true,
          ordenable: true,
          visible: true,
          tipo: TipoDatos.Hora,
          urlMacroCliente: './macro',
          valorDefault: '"2001-01-01T12:30:00"',
          configuracionTabular: {
            indice: 6,
            mostrarEnTabla: true,
            alternarEnTabla: true,
          },
          validadorFecha: {
            minimo: new Date('2001-01-01T08:00:00'),
            maximo: new Date('2001-01-01T18:30:00'),
          },
        },
        {
          id: 'id-ListaSeleccionMultiple',
          nombre: 'i18n-ListaSeleccionMultiple',
          requerida: true,
          buscable: true,
          ordenable: true,
          visible: true,
          tipo: TipoDatos.ListaSeleccionMultiple,
          urlMacroCliente: './macro',
          valorDefault: 'B,C',
          configuracionTabular: {
            indice: 7,
            mostrarEnTabla: true,
            alternarEnTabla: true,
          },
          lista: {
            id: null,
            ordenamiento: OrdenamientoLista.Ninguno,
            datosRemotos: false,
            endpointBusqueda: false,
            endpoint: null,
            elementos: [
              {
                id: '1',
                nombre: 'Elemento A',
                valor: 'A',
                posicion: 1,
              },
              {
                id: '2',
                nombre: 'Elemento B',
                valor: 'B',
                posicion: 2,
              },
              {
                id: '3',
                nombre: 'Elemento C',
                valor: 'C',
                posicion: 0,
              },
              {
                id: '4',
                nombre: 'Elemento D',
                valor: 'D',
                posicion: 3,
              },
            ],
          },
        },
        {
          id: 'id-Texto',
          nombre: 'i18n-Texto',
          requerida: true,
          buscable: true,
          ordenable: true,
          visible: true,
          tipo: TipoDatos.Texto,
          urlMacroCliente: './macro',
          valorDefault: 'sorpresa!',
          configuracionTabular: {
            indice: 8,
            mostrarEnTabla: true,
            alternarEnTabla: true,
          },
          validadorTexto: {
            longitudMinima: 1,
            longitudMaxima: 10,
            regExp: null,
          },
        },
        {
          id: 'id-TextoIndexado',
          nombre: 'i18n-TextoIndexado',
          requerida: true,
          buscable: true,
          ordenable: true,
          visible: true,
          tipo: TipoDatos.TextoIndexado,
          urlMacroCliente: './macro',
          valorDefault: '...',
          configuracionTabular: {
            indice: 9,
            mostrarEnTabla: true,
            alternarEnTabla: true,
          },
        },
      ],
      i18n: [
        {
          idioma: 'es',
          traducciones: [
            {
              clave: 'id-Logico',
              traduccion: 'Campo lógico',
            },
            {
              clave: 'id-LogicoFalse',
              traduccion: 'Campo lógico FALSO',
            },
            {
              clave: 'id-ListaSeleccionSimple',
              traduccion: 'Campo Lista Simple',
            },
            {
              clave: 'id-Fecha',
              traduccion: 'Campo tipo fecha',
            },
            {
              clave: 'id-FechaHora',
              traduccion: 'Campo tipo fecha/hora',
            },
            {
              clave: 'id-Decimal',
              traduccion: 'Campo decimal',
            },
            {
              clave: 'id-Entero',
              traduccion: 'Campo entero',
            },
            {
              clave: 'id-Hora',
              traduccion: 'Campo sólo hora',
            },
            {
              clave: 'id-ListaSeleccionMultiple',
              traduccion: 'Campo lista múltiple',
            },
            {
              clave: 'id-Texto',
              traduccion: 'Campo Texto',
            },
            {
              clave: 'id-TextoIndexado',
              traduccion: 'Campo Texto Indexado',
            },
          ],
        },
        {
          idioma: 'en',
          traducciones: [
            {
              clave: 'id-Logico',
              traduccion: 'Logic field',
            },
            {
              clave: 'id-LogicoFalse',
              traduccion: 'False logic field',
            },
            {
              clave: 'id-ListaSeleccionSimple',
              traduccion: 'Single select List',
            },
            {
              clave: 'id-Fecha',
              traduccion: 'Date only field',
            },
            {
              clave: 'id-FechaHora',
              traduccion: 'Date/Time field',
            },
            {
              clave: 'id-Decimal',
              traduccion: 'Decimal field',
            },
            {
              clave: 'id-Entero',
              traduccion: 'Integer field',
            },
            {
              clave: 'id-Hora',
              traduccion: 'Only time field',
            },
            {
              clave: 'id-ListaSeleccionMultiple',
              traduccion: 'Multiple select field',
            },
            {
              clave: 'id-Texto',
              traduccion: 'Texto field',
            },
            {
              clave: 'id-TextoIndexado',
              traduccion: 'Indexed text field',
            },
          ],
        },
      ],
    };
  }

  dataTable(body: any) {
    const httOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<EntidadMockPagina>('https://localhost:7001/metadatos/buscar', body, httOptions)
  }

  getLang(entity: Entidad, activeLang: string) {
    entity.i18n?.forEach((data: any) => {
      if (data.idioma == activeLang && this.dic.length == 0) {
        data.traducciones!.forEach((trans: any) => {
          var temp: any = {};
          const key: string = trans.clave ?? "";
          temp[key] = trans.traduccion;
          this.dic.push(temp)
        })
        this.obj = Object.assign({}, ...this.dic)
      }
    })
    return this.obj
  }

}


