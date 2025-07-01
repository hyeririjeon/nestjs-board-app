import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

/**
 * nest g service boards --no-spec
 * @Injectable - 다른 컴포넌트에서 이 서비스를 사용할 수 있게 만들어 줌
 * v1 - timestamp 기반 UUID, 
 * as -  ES6의 import 별칭(alias) 문법 , v1 as uuid = v1 -> uuid
 */

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoard(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto) {
        const { title, description } = createBoardDto;
        
        const board: Board = {
            id: uuid(),
            title,
            description: description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }

}
