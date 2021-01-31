// import {EntitySubscriberInterface, EventSubscriber, InsertEvent} from "typeorm";
// import Announcement from "../entities/Announcement";
// import {HttpError} from "routing-controllers";
//
// @EventSubscriber()
// export class PostSubscriber implements EntitySubscriberInterface<Announcement> {
//
//     listenTo() {
//         return Announcement;
//     }
//
//     beforeInsert(event: InsertEvent<Announcement>) {
//         const {parameters} = event.entity;
//
//         const normalizedReadResult = JSON.parse(parameters);
//
//         normalizedReadResult.forEach((parameter: any) => {
//             if (!(parameter.name && parameter.value)) {
//                 throw new HttpError(409, 'Incorrect parameter: ' + JSON.stringify(parameter))
//             }
//         })
//
//     }
//
// }
