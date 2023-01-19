import { Module } from '@nestjs/common';
import { MongooseModule as MongooseMod } from '@nestjs/mongoose';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';

import { EnvironmentConfigService } from '../environment-config/environment-config.service';

import { MongooseService } from './mongoose.config';

@Module({
  imports: [
    MongooseMod.forRootAsync({
      imports: [EnvironmentConfigModule],
      useFactory: async (config: EnvironmentConfigService) => {
        const schema = config.getDatabaseSchema();
        const user = config.getDatabaseUser();
        const password = config.getDatabasePassword();
        const host = config.getDatabaseHost();
        const port = config.getDatabasePort();
        const name = config.getDatabaseName();

        const uri = `${schema}://${user}:${password}@${host}:${port}/${name}?authSource=admin`;
        console.log(typeof uri);
        return { uri };
      },
      inject: [EnvironmentConfigService],
    }),
  ],
})
export class MongooseModule {}
