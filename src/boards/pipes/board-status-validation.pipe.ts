import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

export class BoardStatusValidationPipe implements PipeTransform {
    
    /**
     * readonly
     * 읽기 전용 속성으로 만듬
     * 값 재할당 불가능, 배열 안의 값은 수정 가능
     * 
     * 1. 값 보호
     * 2. 의도 표현
     * 3. 유지보수 용이
     */
    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PRIVATE
    ]
    
    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value}는 올바르지 않은 상태값 입니다.`);
        }


        return value;
    }

    // any - 타입스크립트의 모든 타입 허용
    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1
    }
}