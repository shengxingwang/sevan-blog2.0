const initialState = {
    tags: []
  }

export const GETTAG = 'GETTAG'

const tagData = (state = initialState, action)=>{
    switch (action.type) {
        case GETTAG:
            return {...state, ...action};
        default:
            return state;
    }
};
export default tagData;