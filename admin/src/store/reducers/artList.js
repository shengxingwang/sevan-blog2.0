const initialState = {
    articleList: {}
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