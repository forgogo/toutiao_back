// 引入axios 
import axios from '@/utils/myaxios.js'

//文章列表

export const getPostList = (params) => {
    return axios({
        url: '/post',
        params
     })
}
//获取栏目列表

export const getCategory = () => {
    return axios({
        url: '/category'
     })
}
//发布文章

export const publishPost = (data) => {
    return axios({
      method: 'post',
      url: '/post',
      data
    })
  }