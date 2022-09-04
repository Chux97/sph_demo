import { reqGetCode, reqRegister, reqUserLogin, reqUserInfo, reqUserLogout } from "@/api";
import {setToken, getToken, removeToken} from '@/utils/token'

const state = {
    code: '',
    token: getToken(),
    nickName:'',
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(stae, token) {
        stae.token = token;
    },
    USERINFO(stae,nickName){
        stae.nickName = nickName;
    },
    // 清除数据
    CLEAR(state){
        state.token = '';
        state.nickName = '';
        // 清楚本地存储
        removeToken();
    }
};
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let res = await reqGetCode(phone);
        console.log(res.data);
        if (res.code === 200) {
            commit('GETCODE', res.data)
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 注册
    async registerUser({ commit }, obj) {
        let res = await reqRegister(obj);
        if (res.code === 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error(res.message))
        }
    },
    //登录
    async userLogin({ commit }, data) {
        let res = await reqUserLogin(data);
        if (res.code == 200) {
            commit("USERLOGIN", res.data.token);
            // localStorage.setItem("TOKEN",res.data.token);
            setToken(res.data.token);
            return 'ok'
        } else {
            return Promise.reject(new ErrorEvent('faile'));
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
        let res = await reqUserInfo();     
        if(res.code === 200){
            commit("USERINFO",res.data.nickName);
            return 'ok';      
        }else{
            return Promise.reject(new Error('获取用户信息失败！'));
        }
    },
    // 退出登录
    async userLogout({commit}){
        let res = await reqUserLogout();
        if(res.code === 200){
            commit("CLEAR");
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }

};

export default {
    state,
    mutations,
    actions,
}
