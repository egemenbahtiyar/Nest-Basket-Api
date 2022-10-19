import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  async (data, context: ExecutionContext) => {
    const user = context.getArgByIndex(0)['user'];

    return user;
  },
);
