import { Module } from '@nestjs/common';
import { EligibilityModule } from './modules/eligibility/eligibility.module';

@Module({
  imports: [EligibilityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
