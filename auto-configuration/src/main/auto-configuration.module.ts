import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Global, Module } from "@nestjs/common";
import ConfigurationProviders from './auto-configuration.providers';
import mikroORMConfigurationFactory from './database-configuration.factory';

@Global()
@Module({
    imports: [
        MikroOrmModule.forRootAsync({
            useFactory: mikroORMConfigurationFactory
        })
    ],
    providers: ConfigurationProviders,
    exports: ConfigurationProviders
})
export class AutoConfigurationModule {}