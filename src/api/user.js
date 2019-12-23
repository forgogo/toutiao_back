// 引入axios 
import axios from '@/utils/myaxios.js'

//登录api

export const login = (data) => {
    return axios({
        method: 'post',
        url: '/login',
        data
    })
}

//获取用户详情
export const getUser = (id) => {
    return axios({
        url: `/user/${id}`
    })
}