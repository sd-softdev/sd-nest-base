import { IdIsMissingException } from './exceptions/idIsMissing.exception';
import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { BaseService } from './base.service';

@Controller()
export class BaseController<T> {
    public readonly service: BaseService<T>;

    @Get()
    findAll(): Promise<T[]> {
        return this.service.find({});
    }
    @Get('byId/:id')
    async findOne(@Param('id') id: string) {
        return this.service.findOneById(id);
    }
    @Get('byName/:name')
    async findOneByName(@Param('name') name: string) {
        return this.service.findOneByName(name);
    }

    @Post()
    createOne(@Body() obj: T) {
        return this.service.createOne(obj);
    }

    @Patch()
    async update(@Body() o: T) {
        const obj = o as any;
        if (!(obj as any).id) { throw new IdIsMissingException(); }
        const objOld = await this.service.findOneById((obj as any).id);
        obj.id = (objOld as any).id;
        return this.service.updateOne(obj);
    }

    @Patch('byId/:id')
    async updateById(@Param('id') id: string, @Body() o: T): Promise<T> {
        const obj = o as any;
        const objOld = await this.service.findOneById(id);
        obj.id = (objOld as any).id;
        return this.service.updateOne(obj);
    }
}
