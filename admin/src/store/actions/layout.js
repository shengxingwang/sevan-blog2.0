  
export const CHANGEPATH = 'CHANGEPATH';

// action
export const changePath = (path) => dispatch =>{
    return dispatch({ type: CHANGEPATH, path });
};
  