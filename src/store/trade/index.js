import { reqAddressInfo, reqOrderInfo} from "@/api";
const state={
    userAddress:[],
    orderInfo:{},
};
const mutations={
    GETUSERADDRESS(state,userAddress){
        state.userAddress = userAddress;
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo;
    },

};
const actions={
    // 获取用户地址信息
    async getUserAddress({commit}){
       let res = await reqAddressInfo();
       commit('GETUSERADDRESS',res.data);
    },
    async getOrderInfo({commit}){
        let res = await reqOrderInfo();
        commit('GETORDERINFO',res.data);
    }
};
const getters={};

export default{
    state,
    mutations,
    actions,
    getters,
}


