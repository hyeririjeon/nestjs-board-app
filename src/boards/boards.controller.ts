import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';

/**
 * nest g controller boards --no-spec
 * -no-spec 테스트 파일을 생성하지 않음
 */

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get()
    getAllBoard() {
        return this.boardsService.getAllBoard();
    }
}
