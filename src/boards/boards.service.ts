import { Injectable } from '@nestjs/common';

/**
 * nest g service boards --no-spec
 * @Injectable - 다른 컴포넌트에서 이 서비스를 사용할 수 있게 만들어 줌
 */

@Injectable()
export class BoardsService {
    private boards = [];

    getAllBoard() {
        return this.boards;
    }
}
