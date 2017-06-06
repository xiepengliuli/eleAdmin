//import 数据 from ''	这里面可以获取数据
import * as types from './type.js'

export default{
	/*头部信息*/
	LOGIN_SUCCESS:({commit})=>{
		commit(types.LOGIN_SUCCESS);
	},
	LOGIN_FAIL:({commit})=>{
		commit(types.LOGIN_FAIL);
	}
}