import { Test, TestingModule } from '@nestjs/testing';
import { EligibilityService } from '../eligibility.service';
import { PostEligibilityRequestDto } from '../dtos/post-eligibility-request.dto';
import {
  ConnectionTypeEnum,
  ConsumptionClassEnum,
  RateModalityEnum,
} from '../../../enums';

describe('EligibilityService', () => {
  let service: EligibilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EligibilityService],
    }).compile();

    service = module.get<EligibilityService>(EligibilityService);
  });

  it('should return eligible with annualCO2Savings', () => {
    // Arrange
    const input: PostEligibilityRequestDto = {
      documentNumber: '12345678909',
      connectionType: ConnectionTypeEnum.TWO_PHASE,
      consumptionClass: ConsumptionClassEnum.COMMERCIAL,
      rateModality: RateModalityEnum.CONVENTIONAL,
      consumptionHistory: [3878, 9760, 5976, 2797],
    };

    // Act
    const result = service.checkEligibility(input);

    // Assert
    expect(result).toEqual({
      eligible: true,
      annualCO2Savings: expect.any(Number),
    });
  });

  it('should return ineligible with ineligibility reasons', () => {
    // Arrange
    const input: PostEligibilityRequestDto = {
      documentNumber: '12345678909',
      connectionType: ConnectionTypeEnum.SINGLE_PHASE,
      consumptionClass: ConsumptionClassEnum.RURAL,
      rateModality: RateModalityEnum.GREEN,
      consumptionHistory: [100, 200, 150],
    };

    // Act
    const result = service.checkEligibility(input);

    // Assert
    expect(result).toEqual({
      eligible: false,
      ineligibilityReasons: expect.arrayContaining([
        'Classe de consumo não aceita',
        'Modalidade tarifária não aceita',
        'Consumo muito baixo para tipo de conexão',
      ]),
    });
  });

  it('should return ineligible due to low consumption', () => {
    // Arrange
    const input: PostEligibilityRequestDto = {
      documentNumber: '12345678909',
      connectionType: ConnectionTypeEnum.THREE_PHASE,
      consumptionClass: ConsumptionClassEnum.COMMERCIAL,
      rateModality: RateModalityEnum.CONVENTIONAL,
      consumptionHistory: [100, 150, 120, 130],
    };

    // Act
    const result = service.checkEligibility(input);

    // Assert
    expect(result).toEqual({
      eligible: false,
      ineligibilityReasons: ['Consumo muito baixo para tipo de conexão'],
    });
  });
});
