import { ApiProperty } from '@nestjs/swagger';

export class PostEligibilitySuccessResponseDto {
  @ApiProperty({ type: 'boolean', default: true })
  eligible: boolean;

  @ApiProperty({ type: 'number', minimum: 0 })
  annualCO2Savings?: number;
}

export class PostEligibilityFailureResponseDto {
  @ApiProperty({ type: 'boolean', default: false })
  eligible: boolean;

  @ApiProperty({
    type: [String],
    uniqueItems: true,
    enum: [
      'Classe de consumo não aceita',
      'Modalidade tarifária não aceita',
      'Consumo muito baixo para tipo de conexão',
    ],
  })
  ineligibilityReasons: string[];
}
