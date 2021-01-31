import {EntityRepository} from "typeorm"
import User from "../database/entities/User";
import CrudRepository from "../utils/CrudRepository";
import SignupDTO from "../dto/auth/SignupDTO";

@EntityRepository(User)
class UserRepository extends CrudRepository<User, SignupDTO> {

    public async findByPhone(phone: number): Promise<User> {
        return await this.repository.findOne({
            where: {phone},
        })
    }

    public async getUserWithPassword(phone: string): Promise<User> {
        return await this.repository.createQueryBuilder('user')
            .where('user.phone = :phone', {phone})
            .leftJoinAndSelect("user.teacher", "teacher")
            .leftJoinAndSelect("user.student", "student")
            .addSelect('user.password')
            .getOne();
    }
}


export default UserRepository
