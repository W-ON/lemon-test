import {
  IsString,
  IsEnum,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsInt,
  Min,
  Max,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsCPFOrCNPJConstraint } from '../../../validators/cpf-cnpj.validator';
import {
  ConnectionTypeEnum,
  ConsumptionClassEnum,
  RateModalityEnum,
} from '../../../enums';
import { ValidationMessages } from '../../../validators/validation-messages';

export class PostEligibilityRequestDto {
  @ApiProperty({
    example: '12345678909',
    description: 'Número de CPF ou CNPJ válido',
  })
  @IsString({ message: ValidationMessages.IS_DOCUMENT_STRING })
  @Validate(IsCPFOrCNPJConstraint)
  documentNumber: string;

  @ApiProperty({
    enum: ConnectionTypeEnum,
    example: ConnectionTypeEnum.TWO_PHASE,
  })
  @IsEnum(ConnectionTypeEnum, {
    message: () =>
      ValidationMessages.INVALID_CONNECTION_TYPE(
        Object.values(ConnectionTypeEnum).join(', '),
      ),
  })
  connectionType: ConnectionTypeEnum;

  @ApiProperty({
    enum: ConsumptionClassEnum,
    example: ConsumptionClassEnum.COMMERCIAL,
  })
  @IsEnum(ConsumptionClassEnum, {
    message: () =>
      ValidationMessages.INVALID_CONSUMPTION_CLASS(
        Object.values(ConsumptionClassEnum).join(', '),
      ),
  })
  consumptionClass: ConsumptionClassEnum;

  @ApiProperty({
    enum: RateModalityEnum,
    example: RateModalityEnum.CONVENTIONAL,
  })
  @IsEnum(RateModalityEnum, {
    message: () =>
      ValidationMessages.INVALID_RATE_MODALITY(
        Object.values(RateModalityEnum).join(', '),
      ),
  })
  rateModality: RateModalityEnum;

  @ApiProperty({
    type: [Number],
    example: [3878, 9760, 5976],
  })
  @IsArray({ message: ValidationMessages.IS_ARRAY })
  @ArrayMinSize(3, { message: ValidationMessages.ARRAY_MIN_SIZE })
  @ArrayMaxSize(12, { message: ValidationMessages.ARRAY_MAX_SIZE })
  @IsInt({
    each: true,
    message: ValidationMessages.IS_INT,
  })
  @Min(0, {
    each: true,
    message: ValidationMessages.MIN_VALUE,
  })
  @Max(9999, {
    each: true,
    message: ValidationMessages.MAX_VALUE,
  })
  consumptionHistory: number[];
}
