import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { ReportMovementResponse, ReportMovementMutationArgs } from "../../../types/graph";
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers : Resolvers = {
    Mutation: {
        ReportMovement: privateResolver( async(_, args: ReportMovementMutationArgs, { req, pubSub }) : Promise<ReportMovementResponse> => {
            const user : User = req.user;
            const notNull = cleanNullArgs(args);
            try {
                await User.update({ id: user.id }, { ...notNull });
                const updatedUser = await User.findOne({ id: user.id }); // 업데이트된 유저를 전송해야지 subscription 상태를 업데이트 할 수 있다.
                // pubSub.publish("driverUpdate", { DriversSubscription: user }); // (channelname(필수), paylaod), subscription변경전 user를 전송한다.
                pubSub.publish("driverUpdate", { DriversSubscription: updatedUser }); // subscription변경전 updated 된 user를 전송해야 한다.
                return {
                    ok: true,
                    error: null
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                };
            }
        })
    }
};

export default resolvers;