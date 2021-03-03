module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  migrations: [
    process.env.NODE_ENV == 'development' ?
    "./src/database/migrations/*.ts"
    :
    "./dist/database/migrations/*.js"
  ],
  entities: [
    process.env.NODE_ENV == 'development' ?
    "./src/api/Entitie/*.ts"
    :
    "./dist/Entitie/*.js"
  ],
  cli: {
    migrationsDir: "./src/database/migrations"
  },
  extra: {
    ssl: process.env.NODE_ENV == 'development' ? false : {"rejectUnauthorized":false}
  }
}
