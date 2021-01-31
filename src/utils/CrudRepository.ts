import {AbstractRepository, FindManyOptions, FindOneOptions} from "typeorm"
import queryBuilder from "./queryBuilder";
import Paginate from "./paginate";

abstract class CrudRepository<Entity, EntityDTO> extends AbstractRepository<Entity> {

    public async findAndCount(req: any, options?: FindManyOptions): Promise<{ data: Entity[], _metadata: object }> {
        const [result, count] = await this.repository.findAndCount(Object.assign(queryBuilder(req, true), options));
        const _metadata = Paginate(req, count);
        return {data: result, _metadata}
    }

    public async update(id: number, newValues: any): Promise<Entity> {
        const result: Entity = await this.repository.preload({id, ...newValues});
        await this.repository.save(result);
        return result
    }

    public async delete(id: number): Promise<void> {
        await this.repository.softDelete(id);
    }

    public async findById(id: number, options?: FindOneOptions): Promise<Entity> {
        return await this.repository.findOne(id, options)
    }


    public async create<T>(newEntity: EntityDTO & T): Promise<Entity> {
        return await this.repository.save(newEntity)
    }

}

export default CrudRepository;
