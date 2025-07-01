import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';

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
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto
    ): Board {
        return this.boardsService.createBoard(createBoardDto);
    }
    // :id 파라미터
    @Get('/:id')
    getBoardById(@Param('id') id: string) {
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: string): void {
        this.boardsService.deleteBoard(id);
    }

    @Patch('/:id')
    updateBoard(
        @Param('id') id: string,
        @Body('status') status: BoardStatus
    ): Board | undefined {
        return this.boardsService.updateBoardStatus(id, status);
    }
}
