import { BaseEntity, Entity, ObjectIdColumn, ObjectID, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Base extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
