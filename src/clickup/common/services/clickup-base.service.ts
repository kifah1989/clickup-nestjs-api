import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, isAxiosError } from 'axios';
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
      baseUrl:
        this.configService.get<string>('CLICKUP_API_BASE_URL') ||
        'https://api.clickup.com/api/v2',
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
        Authorization: this.config.apiToken,
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
      catchError((error: unknown) => {
        return throwError(() => this.normalizeError(error, 'GET', url));
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
        Authorization: this.config.apiToken,
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    };

    this.logger.debug(`POST ${url}`, data);

    return this.httpService
      .post<ClickUpApiResponse<T>>(url, data, requestConfig)
      .pipe(
        map((response) => {
          this.logger.debug(`Response: ${JSON.stringify(response.data)}`);
          return response.data as T;
        }),
        catchError((error: unknown) => {
          return throwError(() => this.normalizeError(error, 'POST', url));
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
        Authorization: this.config.apiToken,
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    };

    this.logger.debug(`PUT ${url}`, data);

    return this.httpService
      .put<ClickUpApiResponse<T>>(url, data, requestConfig)
      .pipe(
        map((response) => {
          this.logger.debug(`Response: ${JSON.stringify(response.data)}`);
          return response.data as T;
        }),
        catchError((error: unknown) => {
          return throwError(() => this.normalizeError(error, 'PUT', url));
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
        Authorization: this.config.apiToken,
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    };

    this.logger.debug(`DELETE ${url}`);

    return this.httpService
      .delete<ClickUpApiResponse<T>>(url, requestConfig)
      .pipe(
        map((response) => {
          this.logger.debug(`Response: ${JSON.stringify(response.data)}`);
          return response.data as T;
        }),
        catchError((error: unknown) => {
          return throwError(() => this.normalizeError(error, 'DELETE', url));
        }),
      );
  }

  private normalizeError(
    error: unknown,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
  ): HttpException {
    if (isAxiosError<ClickUpApiResponse<unknown>>(error)) {
      const status = error.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        this.extractErrorMessage(error.response?.data) ?? error.message;
      this.logError(method, url, message, error);
      return new HttpException(message, status, { cause: error });
    }

    if (error instanceof HttpException) {
      this.logError(method, url, error.message, error);
      return error;
    }

    if (error instanceof Error) {
      this.logError(method, url, error.message, error);
      return new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }

    const fallbackMessage = 'Unexpected error occurred while calling ClickUp';
    this.logError(method, url, fallbackMessage);
    return new HttpException(fallbackMessage, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  private extractErrorMessage(data: unknown): string | undefined {
    if (!data) {
      return undefined;
    }

    if (typeof data === 'string') {
      return data;
    }

    if (typeof data === 'object') {
      const record = data as Record<string, unknown>;
      const candidates = ['message', 'error', 'err', 'description'];
      for (const key of candidates) {
        const value = record[key];
        if (typeof value === 'string' && value.trim().length > 0) {
          return value;
        }
      }
    }

    return undefined;
  }

  private logError(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    message: string,
    error?: Error,
  ): void {
    this.logger.error(`${method} ${url} failed: ${message}`, error?.stack);
  }
}
