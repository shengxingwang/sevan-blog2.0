import { fetchTag, editeTag, delTag, addTag } from '../../api';
const GETTAG = 'GETTAG';


// 获取标签
export const getTag = prams => dispatch => {
	return fetchTag(prams).then(res => {
		dispatch({ type: GETTAG, tags: res.data.list||[] });
		return res;
	})
}

// 编辑标签
export const toEditeTag = prams => editeTag(prams)

// 删除标签
export const delectTag = id => delTag({id:id})

// 新增标签
export const toAddTag = prams => addTag(prams)
