let defaultStore = {
    newsdata:{
        count:0,
        list:[],
        offset: 10,
        page: 1,
        totalPage: 1
    }
};

export const newsData = (state = defaultStore, action) => {
    switch (action.type) {
        case 'GETNEWS':
            return {...state, ...action}
        default:
            return state;
    }
};