import React from 'react'
import './login.less'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

export default function Login() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='login'>
            <header className='login-header'>
                <img src={require('./images/logo.png')} alt="" />
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
