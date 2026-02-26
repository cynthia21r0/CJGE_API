import { Client } from 'pg';

export const pgProvider = {
  provide: 'POSTGRES_CONNECTION',
  useFactory: async () => {
    const client = new Client({
      host: 'ep-rough-pine-aibndjn3-pooler.c-4.us-east-1.aws.neon.tech',
      port: 5432,
      user: 'neondb_owner',
      password: 'npg_XIJLWd1D8Smc',
      database: 'cjge',
      ssl: true, // Esto es el equivalente a ?sslmode=require, obligatorio en Neon
    });

    await client.connect();

    return client;
  },
};
