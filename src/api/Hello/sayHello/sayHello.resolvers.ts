import { Greeting } from "../../../types/graph";

const resolvers = {
    Query: {
        sayHello: (): Greeting => {
            return {
                error: false,
                text: "i love you"
            };
        }
    }
};

export default resolvers;