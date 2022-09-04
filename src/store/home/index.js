import {reqCategoryList, reqBannerList, reqFloorList} from '@/api';

// home模块的小仓库
const state = {
    categoryList : [],
    bannerList: [],
    floorList:[],
};
// mutations:修改state的唯一手段
const mutations = {
    GETCATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList;
    },
};
// action:处理action，以书写自己的业务逻辑，也可以处理异步,不能直接修改state
const actions ={
    async getCategoryList({commit}){
        let res = await reqCategoryList();
        if(res.code === 200){
            commit("GETCATEGORYLIST",res.data);
        }
    },
    async getBannerList({commit}){
        let res = await reqBannerList();
        if(res.code === 200){
            commit("GETBANNERLIST",res.data);
        }
    },
    async getFloorList({commit}){
        let res = await reqFloorList();
        if(res.code === 200){
            commit("GETFLOORLIST",res.data);
        }
    },
    
};
// getters:理解为计算数学，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};

export default ({
    state,
    mutations,
    actions,
    getters,
})