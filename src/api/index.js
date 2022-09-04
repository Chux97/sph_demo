// 当前模块：API进行统一管理
import requests from './requests';
import mockRequest from './mockRequests';
import trade from '@/store/trade';

// 三级联动接口 /api/product/getBaseCategoryList
export const reqCategoryList = () =>{
    // 发请求：axios请求
    return requests({url:'/product/getBaseCategoryList', method: 'get'});
}
//获取首页轮播图数据的接口
export const reqBannerList = ()=> mockRequest({url:'/banner',method:'get'});
export const reqFloorList = ()=> mockRequest({url:'/floor',method:'get'});
//搜索模块的请求接口函数:
//将来根据不同的搜索条件,需要给服务器携带不同的参数
//请求体携带搜索的参数
//搜索的条件:它应该是一个对象10K,可有可无，但是data至少是一个空对象
//没有发现:
//第一步:整理搜索的参数
//第二步：根据最新的搜索参数，获取最新的数据展示!!
export const reqSearchList = (params )=>requests({url:'/list',method:'post',data: params });

// 获取产品详情的接口：
export const reqGoodsInfo =(skuId)=>requests({url:`/item/${skuId}`,method:'get'});

//产品添加到购物车中
export const reqAddOrUpdateShopCart = (skuId,skuNum) =>requests({url:`/cart/addToCart/ ${skuId}/${skuNum}`,method:'post'});

// 获取购物车列表数据
export const reqCartList = () => requests({url:'/cart/cartList',method:'get'}) ;

// 删除购物车商品 /api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'DELETE'});

// 指定购物项的选中状态 /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCheckCartId = (skuId, isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 获取注册验证码 /api/user/passport/sendCode/{phone} get
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});

//注册的接口
export const reqRegister = (data)=>requests({url:`/user/passport/register`,method:'post',data});

// 登录的接口
export const reqUserLogin = (data)=>requests({url:`/user/passport/login`,method:'post',data});

//获取用户登录成功以后用户信息的接口 [使用token向服务器要用户信息]
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'});

// 推出登录 /user/passport/logout get
export const reqUserLogout = ()=>requests({url:'/user/passport/logout', method:'get'});

// 获取用户地址信息 /user/userAddress/auth/findUserAddressList
export const reqAddressInfo = ()=>requests({url:`/user/userAddress/auth/findUserAddressList`, method:'get'});

// 获取商品清单 /api/order/auth/trade
export const reqOrderInfo =()=>requests({url:'/order/auth/trade',method:'get'});

// 提交订单接口 /api/order/auth/submitOrder?tradeNo={tradeNo} post
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data})

// 获取支付信息 /api/payment/weixin/createNative/{orderId} GET
export const reqPayInfo = (orderId)=>requests({url:`payment/weixin/createNative/${orderId}`,method:'get'});

// 获取支付订单状态 /api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus =(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

// 获取个人中心的订单  /api/order/auth/{page}/{limit} get
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});

