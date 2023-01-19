import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async updateRefreshToken(username: string, refreshToken: string): Promise<void> {
    await this.userModel.findOneAndUpdate({ username: username }, { hach_refresh_token: refreshToken }).exec();
  }
  async getUserByUsername(username: string): Promise<UserM> {
    const adminUserEntity = await this.userModel.findOne({
      username: username,
    });
    if (!adminUserEntity) {
      return null;
    }
    return this.toUser(adminUserEntity);
  }
  async updateLastLogin(username: string): Promise<void> {}

  private toUser(adminUserEntity: User): UserM {
    const adminUser: UserM = new UserM();

    adminUser.username = adminUserEntity.username;
    adminUser.password = adminUserEntity.password;
    adminUser.lastLogin = adminUserEntity.last_login;
    adminUser.hashRefreshToken = adminUserEntity.hach_refresh_token;

    return adminUser;
  }

  private toUserEntity(adminUser: UserM): User {
    const adminUserEntity: User = new User();

    adminUserEntity.username = adminUser.username;
    adminUserEntity.password = adminUser.password;
    adminUserEntity.last_login = adminUser.lastLogin;

    return adminUserEntity;
  }
}
