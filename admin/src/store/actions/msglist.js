import { getMsg, delMsg } from '../../api';
const GETMSG = 'GETMSG';


//获取动态列表
export const getMsgList = params => dispatch=> {
    return getMsg(params).then(res => {
			dispatch({ type: GETMSG, msgData: res.data })
			return res
	})
}

//删除动态
export const delMsgItem = id => delMsg(id).then(res=> res)
