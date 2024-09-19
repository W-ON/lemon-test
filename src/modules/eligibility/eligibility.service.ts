import { Injectable } from '@nestjs/common';
import { PostEligibilityRequestDto } from './dtos/post-eligibility-request.dto';
import {
  PostEligibilityFailureResponseDto,
  PostEligibilitySuccessResponseDto,
} from './dtos/post-eligibility-response.dto';
import {
  ConnectionTypeEnum,
  ConsumptionClassEnum,
  RateModalityEnum,
} from '../../enums';

@Injectable()
export class EligibilityService {
  checkEligibility(
    body: PostEligibilityRequestDto,
  ): PostEligibilitySuccessResponseDto | PostEligibilityFailureResponseDto {
    const ineligibilityReasons: string[] = [];

    const eligibleClasses = [
      ConsumptionClassEnum.RESIDENTIAL,
      ConsumptionClassEnum.INDUSTRIAL,
      ConsumptionClassEnum.COMMERCIAL,
    ];

    if (!eligibleClasses.includes(body.consumptionClass)) {
      ineligibilityReasons.push('Classe de consumo não aceita');
    }

    const eligibleModalities = [
      RateModalityEnum.CONVENTIONAL,
      RateModalityEnum.WHITE,
    ];

    if (!eligibleModalities.includes(body.rateModality)) {
      ineligibilityReasons.push('Modalidade tarifária não aceita');
    }

    const averageConsumption =
      body.consumptionHistory.reduce((a, b) => a + b, 0) /
      body.consumptionHistory.length;

    let minimumConsumption: number;
    switch (body.connectionType) {
      case ConnectionTypeEnum.SINGLE_PHASE:
        minimumConsumption = 400;
        break;
      case ConnectionTypeEnum.TWO_PHASE:
        minimumConsumption = 500;
        break;
      case ConnectionTypeEnum.THREE_PHASE:
        minimumConsumption = 750;
        break;
      default:
        minimumConsumption = Infinity;
    }

    if (averageConsumption < minimumConsumption) {
      ineligibilityReasons.push('Consumo muito baixo para tipo de conexão');
    }

    if (ineligibilityReasons.length > 0) {
      return {
        eligible: false,
        ineligibilityReasons,
      };
    }

    const annualCO2Savings = parseFloat(
      ((averageConsumption * 12 * 84) / 1000).toFixed(2),
    );

    return {
      eligible: true,
      annualCO2Savings,
    };
  }
}
