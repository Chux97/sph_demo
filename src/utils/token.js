export const setToken = (token)=>{
    localStorage.setItem('TOKEN',token);
}

export const getToken = ()=>{
    return localStorage.getItem('TOKEN');
}
// 清楚本地存储的token
export const removeToken =()=>{
    localStorage.removeItem('TOKEN')
}