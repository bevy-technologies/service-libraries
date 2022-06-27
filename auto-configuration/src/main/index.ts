import { AutoConfigurationModule } from './auto-configuration.module'
import { SecretsManager } from './secrets-manager.service'
import ConfigurationProviders from './auto-configuration.providers'
import mikroORMConfigurationFactory from './database-configuration.factory'

export default {
    AutoConfigurationModule,
    SecretsManager,
    ConfigurationProviders,
    mikroORMConfigurationFactory
}