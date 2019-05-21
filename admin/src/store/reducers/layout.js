const initialState = {
    path:{
        path:'/home/artlist',
        mkey:'art'
    }
}

  export const CHANGEPATH = 'CHANGEPATH';

const layData = (state = initialState, action)=>{
    switch (action.type) {
        case CHANGEPATH:
            return { ...state, ...action}
        default:
            return state;
    }
};
export default layData;