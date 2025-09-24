import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', async () => {
    const server = app.getHttpServer() as unknown as App;
    const response = await request(server).get('/').expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'ClickUp API Integration',
        version: '1.0.0',
        documentation: '/api/docs',
      }),
    );
  });
});
