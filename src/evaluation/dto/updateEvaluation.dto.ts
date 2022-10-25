import { PartialType } from '@nestjs/swagger';
import { CreateEvaluationDto } from './createEvaluation.dto';

export class UpdateEvaluationDto extends PartialType(CreateEvaluationDto) {}
