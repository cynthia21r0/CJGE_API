import { Client } from 'pg';

export const pgProvider = {
  provide: 'POSTGRES_CONNECTION',
  useFactory: async () => {
    const client = new Client({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'cjge'
    });

    await client.connect();

    return client;
  },
};
