import React, { useState } from 'react'
import { Card, Table, Button, Modal, message } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { reqCategorys, reqUpdateCategory, reqAddCategory } from '../../api'
import AddForm from './add-form';
import UpdateForm from './update-form';
import { useEffect } from 'react';
import Context from './context'


export default function Category() {
  // form = React.createRef()
  const [loading, setLoading] = useState(false) // 是否正在获取数据中
  const [categorys, setCategorys] = useState([]) // 一级分类列表
  const [subCategorys, setSubcategorys] = useState([]) // 二级分类列表
  const [parentId, setParentid] = useState('0') // 当前需要显示的分类列表的父分类id
  const [parentName, setParentname] = useState() // 当前需要显示的分类列表的父分类名称
  const [showStatus, setShowstatus] = useState(0) // 标识添加/更新的确认框是否显示，0：都不显示，1：显示添加，2：显示更新
  const [category, setCategory] = useState() // 读取指定的分类
  const [count, setCount] = useState()  // 修改框参数
  const [addc, setAddc] = useState() // 添加框参数

  // 初始化table所有列的数组
  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',  // 显示数据对应的属性名
    },
    {
      title: '操作',
      width: 300,
      render: (category) => (  // 返回需要显示的界面标签
        <span>
          <Button type='link' onClick={() => showUpdate(category)}>修改分类</Button>
          {parentId === '0' ? <Button type='link' onClick={() => showSubCategorys(category)}>查看子分类</Button> : null}

        </span>
      )
    },
  ];

  // 异步获取一级/二级分类列表数组
  const getCategory = async (parent) => {
    // 在发请求前，显示loading
    setLoading(true)
    const paren = parent || parentId
    // 异步ajax请求，获取数据
    const result = await reqCategorys(paren)
    if (result.status === 0) {
      // 在请求完成后，隐藏loading
      setLoading(false)
      // 取出分类数组(可能是一级也可能是二级)
      const categorys = result.data
      if (paren === '0') {
        // 更新一级分类状态
        setCategorys(categorys)
      } else {
        // 更新二级分类状态
        setSubcategorys(categorys)
      }
    } else {
      message.error('获取数据失败')
    }
  }
  // 显示一级分类指定的二级列表
  const showSubCategorys = (category) => {
    // 更新状态
    setParentid(category._id)
    setParentname(category.name)
    // 在状态更新且重新render()后执行
    // 获取二级分类列表显示
    getCategory()
  }
  // 显示一级分类列表
  const showCategorys = () => {
    // 更新为显示一级列表状态
    setParentid('0')
    setParentname('')
    setSubcategorys([])
  }
  // 响应点击取消：隐藏确认框
  const handleCancel = () => {
    setShowstatus(0)
  }
  // 显示添加的确认框
  const showApp = () => {
    setShowstatus(1)
  }
  // 添加框数据
  const add = (v, q) => {
    setAddc({ name: v, id: q })
  }
  // 添加分类
  const addCategory = async () => {
    // 隐藏确认框
    setShowstatus(0)
    // 准备数据
    const parent = addc.id
    const categoryName = addc.name
    // 发请求保存更新分类
    const result = await reqAddCategory(categoryName, parent)
    if (result.status === 0) {
      // form.resetFields()
      if (parent === parentId) {
        // 重新获取当前显示列表
        getCategory()
      } else if (parentId === 0) {
        // 重新显示列表
        setParentid('0')
        getCategory('0')
      }
    }
  }
  // 显示修改的确认框
  const showUpdate = (cate) => {
    // 更新状态
    setShowstatus(2)
    // 保存分类对象
    setCategory(cate)
  }
  // 修改框数据
  const fom = (v) => {
    setCount(v)
  }
  // 更新分类
  const updateCategory = async () => {
    // 隐藏确认框
    setShowstatus(0)
    // 准备数据
    const categor = category._id
    const categoryName = count
    // 发请求保存更新分类
    const result = await reqUpdateCategory(categor, categoryName)
    if (result.status === 0) {
      // form.resetFields()
      // 重新显示列表
      getCategory()
    }
  }
  // 执行异步任务：发送异步ajax请求
  // 获取一级分类列表显示
  useEffect(() => {
    getCategory()
  }, [parentId])
  let ca = category || {}
  // card左侧
  const title = parentId === '0' ? '一级分类列表' : (<span>
    <Button type='link' onClick={() => showCategorys()}>一级分类列表</Button>
    <ArrowRightOutlined style={{ marginRight: 5 }} />
    <span>{parentName}</span>
  </span>)
  // card右侧
  const extra = (
    <Button type='primary' onClick={showApp}>
      <PlusOutlined />
      添加
    </Button>
  )
  return (
    <Card title={title} extra={extra}>
      <Table
        dataSource={parentId === "0" ? categorys : subCategorys}
        columns={columns}
        bordered
        rowKey='_id'
        pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        loading={loading} />

      <Modal title="添加分类" open={showStatus === 1} onOk={addCategory} onCancel={handleCancel} destroyOnClose>
        <Context.Provider value={{ categorys: categorys, parentId: parentId, parentName: parentName }}>
          <AddForm add={add} />
        </Context.Provider>
      </Modal>
      <Modal title="更新分类" open={showStatus === 2} onOk={updateCategory} onCancel={handleCancel} destroyOnClose>
        <Context.Provider value={{ categoryName: ca }}>
          <UpdateForm fom={fom} />
        </Context.Provider>
      </Modal>
    </Card>
  )
}
