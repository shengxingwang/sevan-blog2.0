import { getNews, hideNews, showNews, delNews } from '../../api';
const GETNEWS = 'GETNEWS';


//获取动态列表
export const getNewList = params => dispatch=> {
    return getNews(params).then(res => {
			dispatch({ type: GETNEWS, newsData: res.data })
			return res
	})
}

//隐藏动态
export const hideNewsItem = id => hideNews(id).then(res=> res)
//显示动态
export const showNewsItem = id => showNews(id).then(res=> res)
//删除动态
export const delNewsItem = id => delNews(id).then(res=> res)
