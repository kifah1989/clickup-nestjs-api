import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getInfo', () => {
    it('should include core application metadata', () => {
      const info = appController.getInfo();

      expect(info).toEqual(
        expect.objectContaining({
          name: 'ClickUp API Integration',
          version: '1.0.0',
          documentation: '/api/docs',
        }),
      );
    });
  });

  describe('getHealth', () => {
    it('should report healthy system status with uptime', () => {
      const health = appController.getHealth();

      expect(health).toEqual(
        expect.objectContaining({
          status: 'ok',
        }),
      );

      if (typeof health === 'object' && health !== null && 'uptime' in health) {
        expect(typeof (health as { uptime: unknown }).uptime).toBe('number');
      } else {
        throw new Error('Health response is missing uptime information');
      }
    });
  });
});
