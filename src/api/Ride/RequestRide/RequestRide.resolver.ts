import { Resolvers } from "src/types/resolvers";
import privateResolver from "src/utils/privateResolver";
import { RequestRideMutationArgs, RequestRideResponse } from "src/types/graph";
import User from "src/entities/User";
import Ride from "src/entities/Ride";

const resolvers : Resolvers = {
    Mutation: {
        RequestRide: privateResolver(async(_, args: RequestRideMutationArgs, {req}) : Promise<RequestRideResponse> => {
            const user: User = req.user;
            try {
                const ride = await Ride.create({ ...args, passenger: user }).save();
                return {
                    ok: true,
                    error: null,
                    ride
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    ride: null
                }
            }
        })
    }
}

export default resolvers;