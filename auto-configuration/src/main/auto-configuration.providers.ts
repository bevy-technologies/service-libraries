import { Provider, ValueProvider } from '@nestjs/common';
import { SecretsManager } from './secrets-manager.service';

export enum ConfigurationKeys {
    SERVICE_SHOPIFY_API_SECRET = 'SERVICE_SHOPIFY_API_SECRET',
}

const ConfigurationProviders = [
    {
        provide: ConfigurationKeys.SERVICE_SHOPIFY_API_SECRET,
        // OK, this looks weird :joy:
        useValue: SecretsManager.get(
            process.env[ConfigurationKeys.SERVICE_SHOPIFY_API_SECRET],
        ),
    },
] as Provider[];

export default ConfigurationProviders;
