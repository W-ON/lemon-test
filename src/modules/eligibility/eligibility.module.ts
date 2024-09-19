import { Module } from '@nestjs/common';
import { EligibilityService } from './eligibility.service';
import { EligibilityController } from './eligibility.controller';
import { IsCPFOrCNPJConstraint } from '../../validators/cpf-cnpj.validator';

@Module({
  controllers: [EligibilityController],
  providers: [EligibilityService, IsCPFOrCNPJConstraint],
})
export class EligibilityModule {}
