import {getArtData, getArtList, getTagList, getNews, getFileLog} from '../../api/api';

export const getArt = param => dispatch => {
    return getArtList(param).then(res => {
            let list = res.data.data;
            dispatch({
                type:'GETARTLIST',
                ArtListData:list
            })
            return res.data;
        })
};
export const getArtPage = param => dispatch => {
    return getArtList(param).then(res => {
            let list = res.data.data;
            dispatch({
                type:'GETARTLISTPAGE',
                ArtListData:list
            })
            return res.data;
        })
};

export const getTag = () => {
    return dispatch => {getTagList().then(res => {
            let list = res.data.data;
            return dispatch({
                type:'GETAG',
                TagListData:list
            })
        })
    }
};

export const getArtDet = (params) => {
    return dispatch => {getArtData(params).then(res => {
            let data = res.data.data;
            return dispatch({
                type:'GETARTDET',
                art:data
            })
        })
    }
};
export const getGuiDang = (params) => {
    return dispatch => {getFileLog(params).then(res => {
            let data = res.data.data;
            return dispatch({
                type:'GETDATEDATA',
                dateData:data.list||[]
            })
        })
    }
};

//获取首页新闻接口
// export const getHomeNewsData = () => {
//     return dispatch => {getHomeNews().then(res => {
//             let list = res.data.data.pc_feed_focus||[];
//             return dispatch({
//                 type:'GETHOMRNEWS',
//                 homeNewsList:list
//             })
//         })
//     }
// };

export const getNewsData = (data)=> {
    return dispatch => {
        getNews(data).then(res => {
            if(res.data.code===200){
                let data = res.data.data;
                return dispatch({
                    type:'GETNEWS',
                    newsdata:data
                })
            }
        })
    }
};



