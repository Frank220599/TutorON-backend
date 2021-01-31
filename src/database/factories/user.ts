import {define, factory} from "typeorm-seeding";
import User from "../entities/User";

define(User, (faker, context: { roles: string[] }) => {
    const gender = faker.random.number(1);

    const user = new User();
    user.email = faker.internet.email();
    user.password = faker.random.word();
    return user
});
