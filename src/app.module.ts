import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Task],
      synchronize: true,
    }),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
