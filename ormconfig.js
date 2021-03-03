module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  migrations: [
    process.env.NODE_ENV == 'dev' ?
    "./src/api/database/migrations/*.ts"
    :
    "./dist/api/database/migrations/*.js"
  ],
  entities: [
    process.env.NODE_ENV == 'dev' ?
    "./src/api/Entitie/*.ts"
    :
    "./dist/api/Entitie/*.js"
  ],
  cli: {
    migrationsDir: "./src/api/database/migrations"
  },
  extra: {
    ssl: process.env.NODE_ENV == 'dev' ? false : {"rejectUnauthorized":false}
  }
}
