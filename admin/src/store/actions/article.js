import { getArts, delArt, editeArt, getArtId, addArt} from '../../api';
const GETARTICLES = 'GETARTICLES';


//获取文章列表
export const getArticle = params => dispatch=> {
    return getArts(params).then(res => {
			dispatch({ type: GETARTICLES, articleList: res.data })
			return res
	})
}
// 添加文章
export const addArticle = prams => addArt(prams).then(res => res)

// 删除文章
export const delectArticle = id => delArt(id).then(res=> res)

// 修改文章
export const editeArticle = (prams) => editeArt(prams).then(res => res)

// 根据id获取文章
export const getArticleId = (id) => getArtId(id).then(res => res)


