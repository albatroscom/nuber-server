import { Resolvers } from "../../../types/resolvers";
import { FacebookConnectMutationArgs, FacebookConnectResponse } from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
    Mutation: {
        FacebookConnect: async(_, args: FacebookConnectMutationArgs): Promise<FacebookConnectResponse> => {
            const { fbId } = args;
            try{
                const existingUser = await User.findOne({ fbId });
                if(existingUser){
                    return {
                        ok: true,
                        error: null,
                        token: "Coming Soon"
                    };
                } else {

                }
            }catch(error){
                return {
                    ok: false,
                    error: error.message,
                    token: null
                };
            }

            try{

            }catch(error){
                return {
                    ok: false,
                    error: error.message,
                    token: null
                }
            }
        }
    }
};

export default resolvers;