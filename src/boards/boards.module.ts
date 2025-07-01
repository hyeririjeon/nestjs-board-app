import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';

/**
 * nest g module boards
 * 
 * @Module - NestJS에서 기능 단위를 정의하는 데코레이터, 애플리케이션 구조를 구성하는 데 사용하는 메타 데이터 제공
 * providers - 이 모듈에서 사용할 서비스(의존성)들을 등록할 수 있음
 */

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
