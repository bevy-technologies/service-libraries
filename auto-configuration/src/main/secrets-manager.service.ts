import * as dotenv from 'dotenv';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const PRODUCTION: string = 'production';
const LATEST: string = 'latest';

class SecretManagerService {
    private client: SecretManagerServiceClient;

    private project: string;

    private envName: string;

    constructor() {
        this.client = new SecretManagerServiceClient();
        /*
         * We cannot rely on GOOGLE_CLOUD_PROJECT, since it contains a
         * numeric ID; we actually want the project name as a string.
         */
        this.project = process.env.BEVY_GOOGLE_CLOUD_PROJECT;

        /*
         * !!WARNING!!
         *  
         * Keep in mind that on GAE NODE_ENV is always equal 
         * to production!
         */
        this.envName = process.env.NODE_ENV;

        /*
         * Need to make sure that env is loaded for local development.
         */
        if(process.env.NODE_ENV != 'production') {
            dotenv.config({ path: process.cwd() + '/.env' })
        };
    }

    async get(name: string, version: string = LATEST): Promise<string> {
        let value = name;
        if (this.envName == PRODUCTION) {
            const request = {
                name: `projects/${this.project}/secrets/${name}/versions/${version}`,
            };
            const [res] = await this.client.accessSecretVersion(request);
            value = res.payload.data.toString();
        }
        return value;
    }
}

export const SecretsManager = new SecretManagerService();