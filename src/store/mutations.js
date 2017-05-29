import {
	LOGIN_SUCCESS,
	LOGIN_FAIL
} from './type.js'

const state={
	isLogin:false
};

const mutations={
	/*头部*/
	[LOGIN_SUCCESS](state){
		state.isLogin=true;
	},
	[LOGIN_FAIL](state){
		state.isLogin=false;
	}
};

const getters={
	isLogin(state){
		return state.isLogin;
	}
};

export default{
	state,
	mutations,
	getters
}