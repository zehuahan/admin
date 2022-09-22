import React, { Component } from 'react'
import './login.less'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

export default class Login extends Component {
    render() {
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
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
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
}
