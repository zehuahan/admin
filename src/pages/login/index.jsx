import React from 'react'
import './login.less'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import { Navigate, useNavigate } from 'react-router-dom'
import storageUtils from '../../utils/storageUtils'

export default function Login() {
    // 请求后台登陆
    let navigate = useNavigate()
    const onFinish = async (values) => {
        let { username, password } = values
        const result = await reqLogin(username, password)
        // 判断登录是否成功
        if (result.status === 0) {
            // 登录成功
            // 提示登录成功，保存用户登录信息，跳转到主页面
            message.success('登陆成功')
            // 保存用户数据
            navigate('/')
            const user = result.data
            storageUtils.saveUser(user)
            memoryUtils.user = user
        }
        // 跳转到后台管理路由(已经登录成功，不需要回退了)
        // 如果用户已经登陆, 自动跳转到 admin
        if (memoryUtils.user && memoryUtils.user._id) {
            return <Navigate to='/' replace />
        } else {
            message.error(result.msg)
        }
        // 阻止页面回退
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='login'>
            <header className='login-header'>
                <img src={require('../../assets/images/logo.png')} alt="" />
                <h1>React项目：后台管理系统</h1>
            </header>
            <section className='login-content'>
                <h3>用户登陆</h3>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="username"
                        // 声明式验证
                        rules={[
                            { required: true, message: '用户名不能为空！' },
                            { max: 12, message: '用户名最少为4位！' },
                            { min: 4, message: '用户名最少为4位！' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成！' }
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                validator: (_, value) => {
                                    if (!value) {
                                        return Promise.reject(new Error('密码不能为空！'))
                                    } else if (value.length < 4) {
                                        return Promise.reject(new Error('密码最少为4位！'))
                                    } else if (value.length > 12) {
                                        return Promise.reject(new Error('密码最大为12位！'))
                                    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                                        return Promise.reject(new Error('密码必须是英文、数字或下划线组成！'))
                                    } else {
                                        return Promise.resolve()
                                    }
                                }
                            }
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </section>
        </div>
    )
}
