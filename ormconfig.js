module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  migrations: [
    "./dist/api/database/migrations/*.js"
  ],
  entities: [
    "./dist/api/Entitie/*.js"
  ],
  cli: {
    migrationsDir: "./src/api/database/migrations"
  },
  extra: {
    ssl: false
  }
}
