const initialState = {
    articleList: {
        count: 1,
        list:[],
        offset: 10,
        page: 1,
        totalPage: 1
    }
  }

export const GETARTICLES = 'GETARTICLES';

const article = (state = initialState, action)=>{
    switch (action.type) {
        case GETARTICLES:
            return {...state,...action};
        default:
            return state;
    }
};
export default article;