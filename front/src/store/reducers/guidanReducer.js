let defaultStore = {
    /**
     * 首页数据
     * */
    dateData:[],
};

export const dateData = (state = defaultStore, action) => {
    switch (action.type) {
        case 'GETDATEDATA':
            return {...state, ...action};
        default:
            return state;
    }
};