import { reqSearchList } from '@/api'
// search模块的小仓库
const state = {
    searchList: {},
};
// mutations:修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
// action:处理action，以书写自己的业务逻辑，也可以处理异步,不能直接修改state
const actions = {
    async getSearchList({ commit }, params = {}) {
        let res = await reqSearchList(params);
        if (res.code == 200) {
            commit("GETSEARCHLIST", res.data)
        }

    }

};
// getters:理解为计算数学，用于简化仓库数据，让组件获取仓库的数据更加方便
// 在项目中getters主要作用是：简化仓库中的数据
const getters = {
    goodsList(state) {
        return state.searchList.goodsList||[];
    },
    trademarkList(state) {
        return state.searchList.trademarkList||[];
    },
    attrsList(state) {
        return state.searchList.attrsList||[];
    },
};

export default ({
    state,
    mutations,
    actions,
    getters,
})