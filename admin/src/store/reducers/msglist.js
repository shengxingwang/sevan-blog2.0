const initialState = {
    msgData: {
        count: 1,
        list:[],
        offset: 10,
        page: 1,
        totalPage: 1
    }
  }

export const GETMSG = 'GETMSG';

const msgData = (state = initialState, action)=>{
    switch (action.type) {
        case GETMSG:
            return {...state,...action};
        default:
            return state;
    }
};
export default msgData;