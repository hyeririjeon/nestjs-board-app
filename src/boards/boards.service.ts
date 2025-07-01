import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';

/**
 * nest g service boards --no-spec
 * @Injectable - 다른 컴포넌트에서 이 서비스를 사용할 수 있게 만들어 줌
 * v1 - timestamp 기반 UUID, 
 * as -  ES6의 import 별칭(alias) 문법 , v1 as uuid = v1 -> uuid
 */

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private boardRepository: Repository<Board>,
    ) {}

    getAllBoard(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const { title, description } = createBoardDto;
        
        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })

        await this.boardRepository.save(board);
        return board;
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOneBy({ id });

        if(!found) {
            throw new NotFoundException(`해당 id:${id}의 게시글을 찾을 수 없습니다.`);
        }

        return found;
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);
        
        //affected - TypeORM delete() 메서드 실행 결과에서 삭제된 row의 수
        if(result.affected === 0) {
            throw new NotFoundException(` ${id}는 존재하지 않는 게시물의 id 입니다.`)
        }
        
        console.log('result:', result);
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);
        
        return board;
    }

}
