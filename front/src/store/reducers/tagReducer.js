
let defaultState = {
    TagListData:{
        count: 1,
        list: [],
        offset: 10,
        page: 0,
        totalPage: 0
    }
}

export const TagListData = (state = defaultState, action) => {
    switch(action.type){
        case 'GETAG':
            return {...state, ...action}
        default:
            return state;
    }
}