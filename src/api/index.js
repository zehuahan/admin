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
// jsonp请求接口
export const reqWeather = () => {
    return new Promise((resolve, reject) => {
        const url = 'https://restapi.amap.com/v3/weather/weatherInfo?city=110101&key=bc46a480302a5443f6e6f3667b3eb6fa'  //GET请求
        // 发送jsonp请求
        jsonp(url, {}, (err, data) => {
            if (!err && data.status === '1') {
                // 取出需要的数据
                const { weather,temperature,winddirection,windpower } = data.lives[0]
                resolve({ weather,temperature,winddirection,windpower })
            }else{
                message.error('获取天气信息失败')
            }
        })
    })
    
}
// reqWeather()