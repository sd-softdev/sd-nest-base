## add new functionality
### Entity
- add => ```nest g cl <name>/<name>.entity```
- inherit from ```BaseEntity from 'typeorm'```
feature.entity.ts
```js
import { Base } from './../base.entity';

@Entity()
export class Feature extends Base {
  ...
}
```

### Service
- add => ```nest g s <name>```
- inherit from ```BaseService from './../base.service.ts'```
feature.service.ts
```js
import { Injectable } from '@nestjs/common';
import { FeatureService } from './../feature.service';
import { Feature } from './feature.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FeatureService extends BaseService<Product> {
    constructor(
        @InjectRepository(Feature)
        private readonly fRepo: Repository<Feature>,
    ) {
        super(fRepo);
    }
}
```

### Controller
- add => ```nest g co <name>```
- inherit from ```BaseController from './../base.controller.ts'```
- issue at testing with ```<name>.controller.spec.ts``` yet. Remove this file!
feature.controller.ts
```js
import { FeatureService } from './feature.service';
import { Controller } from '@nestjs/common';
import { Feature } from './feature.entity';
import { BaseController } from './../base.controller';

@Controller('feature')
export class FeatureController extends BaseController<Feature> {
    constructor(public readonly service: FeatureService) {
        super();
    }
}
```

### Module
- add => ```nest g mo <name>```

feature.module.ts
```js
@Module({
    imports: [TypeOrmModule.forFeature([Feature])],
    providers: [FeatureService],
    controllers: [FeatureController],
})
export class FeatureModule {}
```

app.module.ts ( example for mongodb)
```js
@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      database: 'ApiCalls',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      useNewUrlParser: true,
    }),
    ...
    FeatureModule,
  ],
})
export class AppModule { }
```