import { Resolvers } from "../../../types/resolvers";
import { CompletePhoneVerificationMutationArgs, CompletePhoneVerificationResponse } from "../../../types/graph";
import Verification from "../../../entities/Verification";
import User from "../../../entities/User";

const resolvers: Resolvers = {
    Mutation: {
        CompletePhoneVerification: async(_, args: CompletePhoneVerificationMutationArgs) : Promise<CompletePhoneVerificationResponse> => {
            const { phoneNumber, key } = args;
            try {
                const verification = await Verification.findOne({
                    payload: phoneNumber,
                    key
                });
                if(!verification){
                    return {
                        ok: false,
                        error: "Verification key not valid",
                        token: null
                    }
                } else {
                    verification.verified = true;
                    verification.save();
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                }
            }

            try {
                const user = await User.findOne({ phoneNumber });
                if(user){
                    user.verifiedPhoneNumber = true;
                    user.save();
                    return {
                        ok: true,
                        error: null,
                        token: "Coming Soon"
                    };
                } else {
                    // 번호인증은 했지만 사용자 정보는 없을때, 프로필 없데이트로 유도
                    return {
                        ok: true,
                        error: null,
                        token: null
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                }
            }
        }
    }
}

export default resolvers;