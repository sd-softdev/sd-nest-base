import { DuplicateKeyException } from './exceptions/duplicate.exception';
import { ObjectID } from 'mongodb';
import { Repository } from 'typeorm';
import { PropertyIsMissingException } from './exceptions/propIsMissing.exception';

export class BaseService<T> {
    uniqueProps = new Array<string>();
    requiredProps = new Array<string>();
    constructor(private repo: Repository<any>) { }

    // create new obj
    async createOne(as: T) {
        // check for unique properties
        const notUniqueProps = await this.checkMoreUniqueProp(as);
        if (notUniqueProps.length !== 0) {
            throw new DuplicateKeyException(notUniqueProps);
        }

        const notRequiredProps = await this.checkRequiredProps(as);
        if (notRequiredProps.length !== 0) {
            throw new PropertyIsMissingException(notRequiredProps);
        }

        // if is unique, save entity
        return this.repo.save(as);
    }

    async findOneById(id: string | ObjectID): Promise<T> {
        const obj = await this.repo.findByIds([new ObjectID(id)]);

        if (obj.length !== 1) {
            throw new Error('internal error in function "AsService.findOneById" - Not implement yet!');
        }

        return obj[0];
    }
    // find object
    async findAll(): Promise<T[]> {
        return await this.repo.find();
    }
    async find(x: any): Promise<T[]> {
        return this.repo.find(x);
    }

    // update object
    async updateOne(obj: T) {
        return this.repo.save(obj);
    }

    // check functions
    async checkUniqueProp(prop: string, obj: any): Promise<boolean> {
        const o = {};
        o[prop] = obj[prop];
        const result = await this.repo.find(o);
        // console.log("TCL: BaseService -> result", result)
        if (result.length < 1) { return true; } else { return false; }
    }

    checkRequiredProps(obj: any, props?: string[]): string[] {
        const retVal = [];

        if (!props) { props = this.requiredProps; }
        if (props.length === 0) { return retVal; }

        props.forEach(prop => {
            if (Object.getOwnPropertyNames(obj).indexOf(prop) < 0) {
                retVal.push(prop);
            }
        });

        return retVal;
    }

    async checkMoreUniqueProp(obj: any, props?: string[]): Promise<string[]> {
        const o = [];
        const retVal = [];

        if (!props) { props = this.uniqueProps; }
        if (props.length === 0) { return retVal; }

        props.forEach(prop => {
            o.push({ [prop]: obj[prop] });
        });
        const filter = {
            where: { $or: o },
        };

        const res = await this.repo.find(filter);

        props.forEach(prop => {
            const val = obj[prop];
            res.some(ent => {
                if (ent[prop] === val) { retVal.push(prop); return true; }
            });
        });

        return retVal;
    }
}
