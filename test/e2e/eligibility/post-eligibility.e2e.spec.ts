// test/eligibility.e2e-spec.ts

import * as request from 'supertest';
import { INestApplication, HttpStatus, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';

describe('Eligibility End-to-End Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /eligibility', () => {
    it('should return eligible with annualCO2Savings', async () => {
      // Arrange
      const validInput = {
        documentNumber: '38274439899',
        connectionType: 'bifasico',
        consumptionClass: 'comercial',
        rateModality: 'convencional',
        consumptionHistory: [3878, 9760, 5976],
      };

      // Act
      const response = await request(app.getHttpServer())
        .post('/eligibility')
        .send(validInput)
        .expect(HttpStatus.OK);

      // Assert
      expect(response.body).toEqual({
        eligible: true,
        annualCO2Savings: expect.any(Number),
      });
    });

    it('should return ineligible with reasons', async () => {
      // Arrange
      const invalidInput = {
        documentNumber: '38274439899', // Replace with a valid CPF
        connectionType: 'monofasico',
        consumptionClass: 'rural',
        rateModality: 'verde',
        consumptionHistory: [100, 200, 150],
      };

      // Act
      const response = await request(app.getHttpServer())
        .post('/eligibility')
        .send(invalidInput)
        .expect(HttpStatus.OK);

      // Assert
      expect(response.body).toEqual({
        eligible: false,
        ineligibilityReasons: expect.arrayContaining([
          'Classe de consumo não aceita',
          'Modalidade tarifária não aceita',
          'Consumo muito baixo para tipo de conexão',
        ]),
      });
    });

    it('should return validation errors when input is invalid', async () => {
      // Arrange
      const invalidInput = {
        documentNumber: 'invalid', // Invalid CPF/CNPJ
        connectionType: 'invalid',
        consumptionClass: 'invalid',
        rateModality: 'invalid',
        consumptionHistory: [-1, 10000], // Invalid values
      };

      // Act
      const response = await request(app.getHttpServer())
        .post('/eligibility')
        .send(invalidInput)
        .expect(HttpStatus.BAD_REQUEST);

      // Assert
      expect(response.body).toHaveProperty('message');
      expect(Array.isArray(response.body.message)).toBe(true);
      expect(response.body.message.length).toBeGreaterThan(0);
    });
  });
});
