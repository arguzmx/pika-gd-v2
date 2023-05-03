//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.16.0.0 (NJsonSchema v10.7.1.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
} from 'rxjs/operators';
import {
  Observable,
  throwError as _observableThrow,
  of as _observableOf,
} from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpResponseBase,
  HttpContext,
} from '@angular/common/http';

export const METADATOS_API_BASE_URL = new InjectionToken<string>(
  'METADATOS_API_BASE_URL'
);

export interface IMetadatosClient {
  /**
   * @return Success
   */
  entidad(id: string): Observable<Entidad>;
}

@Injectable()
export class MetadatosClient implements IMetadatosClient {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(METADATOS_API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
  }

  /**
   * @return Success
   */
  entidad(id: string, httpContext?: HttpContext): Observable<Entidad> {
    let url_ = this.baseUrl + '/metadatos/entidad/{id}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      context: httpContext,
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processEntidad(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processEntidad(response_ as any);
            } catch (e) {
              return _observableThrow(e) as any as Observable<Entidad>;
            }
          } else
            return _observableThrow(response_) as any as Observable<Entidad>;
        })
      );
  }

  protected processEntidad(response: HttpResponseBase): Observable<Entidad> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (response as any).error instanceof Blob
        ? (response as any).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result200: any = null;
          result200 =
            _responseText === ''
              ? null
              : (JSON.parse(_responseText, this.jsonParseReviver) as Entidad);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result401: any = null;
          result401 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver
                ) as ProblemDetails);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 403) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result403: any = null;
          result403 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver
                ) as ProblemDetails);
          return throwException(
            'Forbidden',
            status,
            _responseText,
            _headers,
            result403
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          let result404: any = null;
          result404 =
            _responseText === ''
              ? null
              : (JSON.parse(
                  _responseText,
                  this.jsonParseReviver
                ) as ProblemDetails);
          return throwException(
            'Not Found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap((_responseText: string) => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf(null as any);
  }
}

export interface ConfiguracionTabular {
  indice?: number;
  mostrarEnTabla?: boolean;
  alternarEnTabla?: boolean;
}

export interface ElementoI18n {
  clave?: string | null;
  traduccion?: string | null;
  subElementos?: ElementoI18n[] | null;
}

export interface ElementoLista {
  id?: string | null;
  nombre?: string | null;
  valor?: string | null;
  posicion?: number;
}

export interface Entidad {
  id?: string | null;
  nombre?: string | null;
  endpointAPI?: string | null;
  propiedades?: Propiedad[] | null;
  i18n?: I18n[] | null;
}

export interface I18n {
  idioma?: string | null;
  traducciones?: ElementoI18n[] | null;
}

export interface Lista {
  id?: string | null;
  ordenamiento?: OrdenamientoLista;
  datosRemotos?: boolean;
  endpointBusqueda?: boolean;
  endpoint?: string | null;
  elementos?: ElementoLista[] | null;
}

export enum OrdenamientoLista {
  Ninguno = 'Ninguno',
  Alfabetico = 'Alfabetico',
  Numerico = 'Numerico',
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
}

export interface Propiedad {
  id?: string | null;
  nombre?: string | null;
  requerida?: boolean;
  buscable?: boolean;
  ordenable?: boolean;
  visible?: boolean;
  tipo?: TipoDatos;
  urlMacroCliente?: string | null;
  valorDefault?: string | null;
  configuracionTabular?: ConfiguracionTabular;
  validadorTexto?: ValidadorTexto;
  validadorNumerico?: ValidadorNumerico;
  validadorFecha?: ValidadorFecha;
  lista?: Lista;
}

export enum TipoDatos {
  Desconocido = 'Desconocido',
  Texto = 'Texto',
  TextoIndexado = 'TextoIndexado',
  Decimal = 'Decimal',
  Entero = 'Entero',
  Logico = 'Logico',
  Fecha = 'Fecha',
  Hora = 'Hora',
  FechaHora = 'FechaHora',
  ListaSeleccionSimple = 'ListaSeleccionSimple',
  ListaSeleccionMultiple = 'ListaSeleccionMultiple',
}

export interface ValidadorFecha {
  minimo?: Date | null;
  maximo?: Date | null;
}

export interface ValidadorNumerico {
  minimo?: number | null;
  maximo?: number | null;
}

export interface ValidadorTexto {
  longitudMinima?: number | null;
  longitudMaxima?: number | null;
  regExp?: string | null;
}

export class ApiException extends Error {
  override message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;

  constructor(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result: any
  ) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}

function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any
): Observable<any> {
  if (result !== null && result !== undefined) return _observableThrow(result);
  else
    return _observableThrow(
      new ApiException(message, status, response, headers, null)
    );
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next('');
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = (event) => {
        observer.next((event.target as any).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}
