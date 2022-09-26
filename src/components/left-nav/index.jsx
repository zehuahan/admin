import React, { Component } from 'react'
import './index.less'
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
import menuList from '../../config/menuConfig';
import * as Icons from "@ant-design/icons";


const SubMenu = Menu.SubMenu
// 左侧导航组件
export default class LeftNav extends Component {
  getMenuNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              {React.createElement(Icons[item.icon])}
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      } else {
        pre.push((
          <SubMenu key={item.key} icon={React.createElement(Icons[item.icon])} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        ))
      }
      return pre
    }, [])
  }

  render() {
    return (
      <div className='left-nav'>
        <Link to='/' className='left-nav-header'>
          <img src={require('../../assets/images/logo.png')} alt="" />
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          defaultSelectedKeys={window.location.pathname === '/' ? '/home' : window.location.pathname}   // 当前请求路径也就是key，默认显示的标签
          defaultOpenKeys={[window.location.pathname === '/category' ? '/products':window.location.pathname==='/product' ? '/products': window.location.pathname.indexOf('/chart') === 0 ? '/charts' : '']}   // 默认展开
          mode="inline"
          theme="dark"
        >
          {this.getMenuNodes(menuList)}
        </Menu>
      </div>
    )
  }
}
