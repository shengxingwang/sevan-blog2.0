import {fetch, post} from "./http";

//获取文章列表
export const getArtList = (params)=> {
    return fetch('/sevanBlog/blog.php?action=getArtList',params);
};

//获取根据id获取文章
export const getArtData = (params)=> {
    return fetch('/sevanBlog/blog.php?action=getArtDet', params);
};
//获取标签列表
export const getTagList = (params)=> {
    return fetch('/sevanBlog/blog.php?action=getTaglist', {params});
};
//获取动态
export const getNews = (data)=> {
    return fetch('/sevanBlog/blog.php?action=getNews',data);
};
//记录阅读量
export const lookhot = (data)=> {
    return fetch('/sevanBlog/blog.php?action=lookCount',data);
};
//获取热门文章
export const getArtHot = (data)=> {
    return fetch('/sevanBlog/blog.php?action=getArtHot',data);
};
//获取归档数据
export const getFileLog = (data)=> {
    return fetch('/sevanBlog/blog.php?action=getDateData',data);
};


//获取首页新闻
export const getHomeNews = ()=> {
    return fetch('/sevanBlog/blog.php',{'action':'getHomeNews'});
};
//获取评论
export const getCouldData = (data)=> {
    return fetch('/sevanBlog/blog.php',data);
};

//提交留言
export const putTouch = (data)=> {
    return post('/sevanBlog/blog.php?action=addTouch',data);
};