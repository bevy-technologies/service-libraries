import { ReflectMetadataProvider } from '@mikro-orm/core';
import {
    MikroOrmModuleOptions
} from '@mikro-orm/nestjs';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { SecretsManager } from './secrets-manager.service';

const mikroORMConfigurationFactory = async () => {
    
    const {
        SERVICE_DATABASE_HOST,
        SERVICE_DATABASE_PASS,
        SERVICE_DATABASE_USER,
        SERVICE_DATABASE_PORT,
        SERVICE_DATABASE_NAME,
    } = process.env;
    return {
        type: 'mysql',
        dbName: SERVICE_DATABASE_NAME,
        host: SERVICE_DATABASE_HOST,
        port: parseInt(SERVICE_DATABASE_PORT),
        password: await SecretsManager.get(SERVICE_DATABASE_PASS),
        user: await SecretsManager.get(SERVICE_DATABASE_USER),
        autoLoadEntities: true,
        metadataProvider: ReflectMetadataProvider,
        highlighter: new SqlHighlighter(),
        debug: true,
        migrations: {
            tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
            path: './dist/src/migrations', // path to the folder with migrations
            pathTs: './src/migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
            glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
            transactional: true, // wrap each migration in a transaction
            disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
        }
    } as MikroOrmModuleOptions
}
export default mikroORMConfigurationFactory;