import { reqCartList, reqDeleteCartById, reqUpdateCheckCartId } from "@/api";
const state = {
    cartList: []
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};
const actions = {
    // 获取购物车列表
    async getCartList({commit}) {
        let res = await reqCartList();
        if (res.code == 200) {
            commit("GETCARTLIST", res.data);
        }
    },
    async deleteCartBySkuId({commit },skuId) {
        let res = await reqDeleteCartById(skuId)
        if (res.code == 200) {
            return 'ok';
        } else {
            return Promise.reject();
        }
    },
    async updateCheckedById({commit},{skuId,isChecked }) {
        let res = await reqUpdateCheckCartId(skuId, isChecked);
        if (res.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    deleteAllCart({state, dispatch}) {
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            item.isChecked == 1 ? dispatch('deleteCartBySkuId', item.skuId) : '';
            promiseAll.push(promiseAll);
        });
        return Promise.all(promiseAll);
    },
    // 修改全部产品的状态
    updateAllCartIsChecked({state, dispatch}, isChecked) {
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach((item) => {
            let params = {skuId: item.skuId, isChecked:isChecked };
            let promise = dispatch('updateCheckedById',params);
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
    }
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
};

export default {
    state,
    mutations,
    actions,
    getters,
}
