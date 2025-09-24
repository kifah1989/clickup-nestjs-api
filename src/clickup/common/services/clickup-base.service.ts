import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { Observable, map, catchError, throwError } from 'rxjs';
import { ClickUpConfig, ClickUpApiResponse } from '../interfaces';

@Injectable()
export class ClickUpBaseService {
  private readonly logger = new Logger(ClickUpBaseService.name);
  private readonly config: ClickUpConfig;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.config = {
      apiToken: this.configService.get<string>('CLICKUP_API_TOKEN') || '',
      baseUrl: this.configService.get<string>('CLICKUP_API_BASE_URL') || 'https://api.clickup.com/api/v2',
    };

    if (!this.config.apiToken) {
      throw new Error('CLICKUP_API_TOKEN is required');
    }
  }

  protected get<T>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Observable<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const requestConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        'Authorization': this.config.apiToken,
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    };

    this.logger.debug(`GET ${url}`);

    return this.httpService.get<ClickUpApiResponse<T>>(url, requestConfig).pipe(
      map((response) => {
        this.logger.debug(`Response: ${JSON.stringify(response.data)}`);
        return response.data as T;
      }),
      catchError((error) => {
        this.logger.error(`Error: ${error.message}`, error.stack);
        return throwError(() => error);
      }),
    );
  }

  protected post<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Observable<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const requestConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        'Authorization': this.config.apiToken,
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    };

    this.logger.debug(`POST ${url}`, data);

    return this.httpService.post<ClickUpApiResponse<T>>(url, data, requestConfig).pipe(
      map((response) => {
        this.logger.debug(`Response: ${JSON.stringify(response.data)}`);
        return response.data as T;
      }),
      catchError((error) => {
        this.logger.error(`Error: ${error.message}`, error.stack);
        return throwError(() => error);
      }),
    );
  }

  protected put<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Observable<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const requestConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        'Authorization': this.config.apiToken,
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    };

    this.logger.debug(`PUT ${url}`, data);

    return this.httpService.put<ClickUpApiResponse<T>>(url, data, requestConfig).pipe(
      map((response) => {
        this.logger.debug(`Response: ${JSON.stringify(response.data)}`);
        return response.data as T;
      }),
      catchError((error) => {
        this.logger.error(`Error: ${error.message}`, error.stack);
        return throwError(() => error);
      }),
    );
  }

  protected delete<T>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Observable<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const requestConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        'Authorization': this.config.apiToken,
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    };

    this.logger.debug(`DELETE ${url}`);

    return this.httpService.delete<ClickUpApiResponse<T>>(url, requestConfig).pipe(
      map((response) => {
        this.logger.debug(`Response: ${JSON.stringify(response.data)}`);
        return response.data as T;
      }),
      catchError((error) => {
        this.logger.error(`Error: ${error.message}`, error.stack);
        return throwError(() => error);
      }),
    );
  }
}