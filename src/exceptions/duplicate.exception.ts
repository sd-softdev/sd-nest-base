import { HttpException } from '@nestjs/common';
import { ServerHttpsStatus } from '../httpStateCode/http.enum';

export class DuplicateKeyException extends HttpException {
    constructor(key: string | string[]) {
        let keys = '';
        if (Array.isArray(key)) {
            for (let idx = 0; idx < key.length; idx++) {
                keys += key[idx];
                if ((key.length - 1) !== idx) {
                    keys += ', ';
                }
            }
        } else {
            keys = key;
        }
        super('object with this ' + keys + ' is already exist in database!', ServerHttpsStatus.NOT_UNIQUE_PROPERTY_IN_ENTITY);
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
