import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { EligibilityService } from './eligibility.service';
import {
  ApiTags,
  getSchemaPath,
  ApiOkResponse,
  ApiExtraModels,
} from '@nestjs/swagger';
import { PostEligibilityRequestDto } from './dtos/post-eligibility-request.dto';
import {
  PostEligibilityFailureResponseDto,
  PostEligibilitySuccessResponseDto,
} from './dtos/post-eligibility-response.dto';

@ApiTags('eligibility')
@ApiExtraModels(
  PostEligibilitySuccessResponseDto,
  PostEligibilityFailureResponseDto,
)
@Controller('eligibility')
export class EligibilityController {
  constructor(private readonly eligibilityService: EligibilityService) {}

  @Post()
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Eligibility result',
    schema: {
      oneOf: [
        { $ref: getSchemaPath(PostEligibilitySuccessResponseDto) },
        { $ref: getSchemaPath(PostEligibilityFailureResponseDto) },
      ],
    },
  })
  checkEligibility(@Body() body: PostEligibilityRequestDto) {
    return this.eligibilityService.checkEligibility(body);
  }
}
