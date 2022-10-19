import { RefreshToken } from './entities/refresh-token.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user/entitiy/user.entitiy';

@Injectable()
export class RefreshTokensRepository extends Repository<RefreshToken> {
  constructor(private dataSource: DataSource) {
    super(RefreshToken, dataSource.createEntityManager());
  }

  public async createRefreshToken(
    user: User,
    ttl: number,
  ): Promise<RefreshToken> {
    const refreshToken = new RefreshToken();

    refreshToken.userId = user.id;
    refreshToken.isRevoked = false;

    const expiration = new Date();
    expiration.setTime(expiration.getTime() + ttl);

    refreshToken.expires = expiration;

    return this.save(refreshToken);
  }

  public async findTokenById(id: number): Promise<RefreshToken | null> {
    return this.findOneBy({ id: id });
  }
}
