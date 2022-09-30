/*包含 n 个接口请求函数的模块
每个函数返回 promise
*/
import { message } from 'antd'
import jsonp from 'jsonp'
import ajax from './ajax'

// 登陆
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/ass', user, 'POST')

// 获取一级/二级分类的列表
export const reqCategorys = (parentId) => ajax('/manage/category/list', { parentId })

// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax('/manage/category/add', { categoryName, parentId }, 'POST')

// 更新分类
export const reqUpdateCategory = (categoryId, categoryName) => ajax('/manage/category/update', { categoryId, categoryName }, 'POST')

// 获取一个分类
export const reqCategory = (categoryId) => ajax('/manage/category/info', { categoryId })

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', { pageNum, pageSize })

// 更新商品的状态（上架/下架）
export const reqUpdateStatus = (productId, status) => ajax('/manage/product/updateStatus', { productId, status } ,'POST')

// 搜索商品分页列表(根据商品名称/商品描述)
// searchType:搜索的类型，productName/productDesc
export const reqSearchProducts = ({ pageNum, pageSize, searchType, searchName }) => ajax('/manage/product/search', { pageNum, pageSize, [searchType]: searchName })

// jsonp请求接口
export const reqWeather = () => {
    return new Promise((resolve, reject) => {
        const url = 'https://restapi.amap.com/v3/weather/weatherInfo?city=110101&key=3c385910c18a826633b5ca6d01306676'  //GET请求
        // 发送jsonp请求
        jsonp(url, {}, (err, data) => {
            if (!err && data.status === '1') {
                // 取出需要的数据
                const { weather, temperature, winddirection, windpower } = data.lives[0]
                resolve({ weather, temperature, winddirection, windpower })
            } else {
                message.error('获取天气信息失败')
            }
        })
    })
}