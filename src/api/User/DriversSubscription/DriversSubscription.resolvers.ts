const resolvers = {
    Subscription: {
        DriversSubscription: {
            subscribe: (_, __, { pubSub }) => {
                return pubSub.asyncIterator("driverUpdate"); // driverUpdate 라는 채널의 변화를 관찰한다.
            }
        }
    }
};

export default resolvers;