const initialState = {
    newsData: {
        count: 1,
        list:[],
        offset: 10,
        page: 1,
        totalPage: 1
    }
  }

export const GETNEWS = 'GETNEWS';

const newsData = (state = initialState, action)=>{
    switch (action.type) {
        case GETNEWS:
            return {...state,...action};
        default:
            return state;
    }
};
export default newsData;