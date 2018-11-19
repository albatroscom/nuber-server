import { Resolvers } from "src/types/resolvers";
import privateResolver from "src/utils/privateResolver";
import { UpdateRideStatusMutationArgs, UpdateRideStatusResponse } from "src/types/graph";
import Ride from "src/entities/Ride";
import User from "src/entities/User";

const resolvers : Resolvers = {
    Mutation: {
        UpdateRideStatus: privateResolver(async(_, args: UpdateRideStatusMutationArgs, { req }) : Proimse<UpdateRideStatusResponse> => {
            const user: User = req.user;
            if(user.isDriving){
                try {
                    const ride = await Ride.findOne({id: args.rideId, status: "REQUESTING"});
                    if(ride){
                        ride.status = args.status;
                        ride.save();
                    } else {
                        return {
                            ok: false,
                            error: "Can't Update Ride"
                        }
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message
                    }
                }

            }
        })
    }
};

export default resolvers;