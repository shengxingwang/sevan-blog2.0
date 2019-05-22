import http from './myhttp';
import { imgUpURL } from './../config'

//文件上传
export const upFile = (params={}) => {
    console.log(params);
    return  http.post(imgUpURL, {...params});
}

//登录
export const login = (params={}) => {
    return  http.post('loginout.php?action=login', { ...params });
}

//获取文章列表
export const getArts = (params={}) => {
    return http.get('blog.php?action=getArtList', { params });

}
//添加文章
export const addArt = (params={}) => {
    return http.post('blog.php?action=addArtcle', { ...params });

}

//删除文章
export const delArt = (params={}) => {
    return http.post('blog.php?action=delArt', { ...params });

}
//根据ID获取文章
export const getArtId = (params={}) => {
    return http.get('blog.php?action=getArtDet', { params });

}
//修改文章
export const editeArt = (params={}) => {
    return http.post('blog.php?action=editArt', { ...params });
}






//获取标签列表
export const fetchTag = (params={}) => {
    return http.get('blog.php?action=getAllTag', { params });

}
//添加标签
export const addTag = (params={}) => {
    console.log(params);
    return http.post('blog.php?action=addTag', { ...params });

}
//删除标签
export const delTag = (params={}) => {
    return http.post('blog.php?action=delTag', { ...params });

}
//编辑标签
export const editeTag = (params={}) => {
    return http.post('blog.php?action=upTag', { ...params });

}

//发表动态
export const putNews = (params={}) => {
    return http.post('blog.php?action=addNews', { ...params });

}

//获取动态
export const getNews = (params={}) => {
    return http.get('blog.php?action=getNewsAdmin', { params });

}
//隐藏动态
export const hideNews = (params={}) => {
    return http.post('blog.php?action=hideNews', { ...params });
}
//删除动态
export const delNews = (params={}) => {
    return http.post('blog.php?action=delNews', { ...params });
}
//显示动态
export const showNews = (params={}) => {
    return http.post('blog.php?action=showNews', { ...params });
}

