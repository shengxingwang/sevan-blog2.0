let defaultState = {
    ArtListData:{
        count: 1,
        list: [],
        offset: 10,
        page: 0,
        totalPage: 0
    }
}

export const ArtListData = (state = defaultState, action) => {
    switch(action.type){
        case 'GETARTLIST':
            return {...state, ...action}
        case 'GETARTLISTPAGE':
            action.ArtListData.list = state.ArtListData.list.concat(action.ArtListData.list)
            return {...state, ...action}
        default:
            return state;
    }
}
// GETARTLIST