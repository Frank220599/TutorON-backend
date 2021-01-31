import {Factory, Seeder} from 'typeorm-seeding'
import {Connection} from 'typeorm'
import User from '../entities/User'
import bcrypt from "bcryptjs";
import {Permissions} from "../../constants/enums";

export default class CreateUsers implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        const password = await bcrypt.hash('22051999', 12);

        await connection
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
                id: 1,
                phone: 998998845881,
                status: Permissions.active,
                full_name: 'Admin Frank Admin',
                role: 'admin',
                about: 'I am an admin',
                birthday: '22.05.1999',
                email: 'mr.frank220599@gmail.com',
                password,
            })
            .execute()
    }
}