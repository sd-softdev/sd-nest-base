import { HttpException } from '@nestjs/common';
import { ServerHttpsStatus } from '../httpStateCode/http.enum';

export class ElementNotFoundException extends HttpException {
    constructor() {
        super('Element not exist in array!', ServerHttpsStatus.ELEMENT_NOT_FOUND);
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
