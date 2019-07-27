import { HttpException } from '@nestjs/common';
import { ServerHttpsStatus } from '../httpStateCode/http.enum';

export class PropertyIsMissingException extends HttpException {
    constructor(prop: string[] | string) {
        super('Property \'' + prop + '\' is missing!', ServerHttpsStatus.PROPERTIES_IS_MISSING);
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
