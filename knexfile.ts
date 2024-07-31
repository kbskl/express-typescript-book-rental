import type {Knex} from "knex";

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST!,
            port:Number(process.env.DB_PORT as string),
            user:process.env.DB_USER!,
            password:process.env.DB_PASSWORD!,
            database:process.env.DB_NAME!,
        },
        useNullAsDefault: true,
    },
};

export default config;
