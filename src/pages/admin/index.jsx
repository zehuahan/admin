import React, { Component } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import memeoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import Home from '../home'
import Category from '../category';
import Product from '../product';
import Role from '../role';
import User from '../user';
import Bar from '../charts/bar';
import Line from '../charts/line'
import Pie from '../charts/pie'
/*后台管理的路由组件*/
const { Footer, Sider, Content } = Layout;
export default class Admin extends Component {
  render() {
    const user = memeoryUtils.user
    if (!user._id) {
      return <Navigate to='/login' />
    }
    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content style={{margin:20,background:'#fff'}}>
            <Routes>
              <Route path='/home' index element={<Home />} />
              <Route path='/category' element={<Category />} />
              <Route path='/product' element={<Product />} />
              <Route path='/role' element={<Role />} />
              <Route path='/user' element={<User />} />
              <Route path='/charts/bar' element={<Bar />} />
              <Route path='/charts/line' element={<Line />} />
              <Route path='/charts/pie' element={<Pie />} />
              <Route path="*" element={<Navigate to ="/home" />}/>
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#ccc' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}
