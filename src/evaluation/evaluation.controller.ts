import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, Override, ParsedBody } from '@nestjsx/crud';
import { Evaluation } from './entity/evaluation.entity';
import { CreateEvaluationDto } from './dto/createEvaluation.dto';
import { UpdateEvaluationDto } from './dto/updateEvaluation.dto';
import { User } from '../user/entitiy/user.entitiy';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { EvaluationService } from './evaluation.service';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';

@ApiTags('Evaluation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Crud({
  model: {
    type: Evaluation,
  },
  dto: {
    create: CreateEvaluationDto,
    update: UpdateEvaluationDto,
  },
  query: {
    alwaysPaginate: true,
    limit: 5,
    maxLimit: 100,
  },
  routes: {
    only: [
      'getOneBase',
      'getManyBase',
      'deleteOneBase',
      'updateOneBase',
      'createOneBase',
    ],
  },
})
@Controller('evaluation')
export class EvaluationController {
  constructor(public service: EvaluationService) {}

  @Override()
  async createOne(
    @ParsedBody() dto: CreateEvaluationDto,
    @CurrentUser() currentUser: User,
  ) {
    const data = {
      rating: dto.rating,
      comment: dto.comment,
      productId: dto.productId,
      user: currentUser,
    };

    return await this.service.create(data);
  }
}
