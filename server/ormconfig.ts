import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const options: MysqlConnectionOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'user',
  password: 'password',
  database: 'develop',
  // entities: [__dirname + '/**/*.entity{.ts,.js}'],
  entities: [],
  // migrations: ['migration/*.migration{.ts,.js}'],
  // cli: {
  //   migrationsDir: 'migration',
  // },
};

module.exports = options;
