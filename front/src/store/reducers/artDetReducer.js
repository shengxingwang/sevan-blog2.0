let defaultState = {
    art:{}
}

export const ArtData = (state = defaultState, action) => {
    switch(action.type){
        case 'GETARTDET':
            return {...state, ...action}
        default:
            return state;
    }
}
// GETARTLIST