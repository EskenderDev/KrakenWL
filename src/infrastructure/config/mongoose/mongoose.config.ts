import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

type DatabaseConfig = {
  schema: string;
  host: string;
  port: number;
  dbName: string;
  username: string;
  password: string;
  options: string[];
};

@Injectable()
export class MongooseService implements MongooseOptionsFactory {
  constructor(private readonly config: EnvironmentConfigService) {}

  private buildUri(): string {
    return `
    ${this.config.getDatabaseSchema()}
    ://${this.config.getDatabaseUser()}
    :${this.config.getDatabasePassword()}
    @${this.config.getDatabaseHost()}
    :${this.config.getDatabasePort()}
    /${this.config.getDatabaseName()}?authSource=admin`;
  }

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.buildUri(),
    };
  }
}
