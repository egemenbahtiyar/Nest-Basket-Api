import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('evaluation')
@Controller('evaluation')
export class EvaluationController {}
