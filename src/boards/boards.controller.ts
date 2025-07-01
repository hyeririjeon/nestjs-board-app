import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';

/**
 * nest g controller boards --no-spec
 * -no-spec 테스트 파일을 생성하지 않음
 */

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get()
    getAllBoard(): Board[] {
        return this.boardsService.getAllBoard();
    }

    @Post()
    createBoard(
        @Body('title') title: string,
        @Body('description') description: string
    ): Board {
        return this.boardsService.createBoard(title, description);
    }
}
