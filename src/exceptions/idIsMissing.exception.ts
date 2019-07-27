import { HttpException } from '@nestjs/common';
import { ServerHttpsStatus } from '../httpStateCode/http.enum';

export class IdIsMissingException extends HttpException {
    constructor() {
        super('Property "id" is missing!', ServerHttpsStatus.ID_IS_MISSING);
    }

    throwExceptionForTesting() {
        throw this;
    }

    async throwExceptionForTestingAsync(): Promise<any> {
        return new Promise(resolve => {
            throw this;
        });
    }
}
