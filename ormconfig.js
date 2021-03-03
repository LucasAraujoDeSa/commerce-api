module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  migrations: [
    "./dist/database/migrations/*.js"
  ],
  entities: [
    "./dist/Entitie/*.js"
  ],
  cli: {
    migrationsDir: "./src/api/database/migrations"
  },
  extra: {
    ssl: false
  }
}
