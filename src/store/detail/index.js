import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api";
// 封装游客身份的uuid-->生成一个随机的字符串（不能改变了）
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo: {},
    uuid_token:getUUID(),
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
};

const actions = {
    // 获取产品信息action
    async getGoodInfo({ commit }, skuId) {
        let res = await reqGoodsInfo(skuId);
        if (res.code === 200) {
            commit('GETGOODINFO', res.data)
        }
    },
    // 产品添加到购物车中,
    async addOrUpdateShopCart({commit},{skuId,skuNum}){   
        // 加入购物车的解构。
        // 服务器写入数据成功，不返回其它数据，只是返回cdoe=200 代表这次操作成功
        let res = await reqAddOrUpdateShopCart(skuId,skuNum);
        if(res.code === 200){
            return 'ok'
        }else{
            // 加入购物车失败
            return Promise.reject(new Error('faile'));
        }
    }
};
const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {};
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
}


