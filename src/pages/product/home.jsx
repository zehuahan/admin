import React, { useState, useEffect } from 'react'
import { Card, Select, Input, Button, Table, message } from 'antd'
import { PlusOutlined } from "@ant-design/icons";
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api';
import { PAGE_SIZE } from '../../utils/constants'
import { useNavigate } from 'react-router-dom';

export default function ProductHome() {
    const Option = Select.Option
    const navigate = useNavigate()
    const [products, setProducts] = useState([])     // 商品的数组
    const [total, setTotal] = useState(0)   // 商品的总数量
    const [loading, setLoading] = useState(false) // 是否加载中 
    const [searchName, setSearchName] = useState() // 搜索的关键字
    const [searchType, setSearchType] = useState('productName') // 搜索的类型
    const [pageNum, setPageNum] = useState()
    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: '价格',
            dataIndex: 'price',
            render: (price) => `¥${price}`    // 指定了对应的属性传入对应的值
        },
        {
            width: 100,
            title: '状态',
            render: (product) => {
                const { status, _id } = product
                return (
                    <span>
                        <Button type='primary' onClick={() => updateStatus(_id, status === 1 ? 2 : 1)}>{status === 1 ? '下架' : '上架'}</Button>
                        <span>{status === 1 ? '在售' : '已下架'}</span>
                    </span>
                )
            }
        },
        {
            width: 100,
            title: '操作',
            render: (text, record, index) => {
                return (
                    <span>
                        {/* 将product对象作为参数传到详情页 */}
                        <Button type='link' onClick={() => navigate(window.location.pathname + '/detail', { state: products[index] })}>详情</Button>
                        <Button type='link'>修改</Button>
                    </span>
                )
            }
        },
    ];
    // 更新指定商品的状态
    const updateStatus = async(productId, status) => {
        const result = await reqUpdateStatus(productId, status)
        if(result.status === 0){
            message.success('更新商品成功')
            getProducts(pageNum)
        }
    }

    // 获取指定列表的数据显示
    const getProducts = async (pageNum) => {
        setPageNum(pageNum)
        setLoading(true)    // 显示loading
        // 如果搜索关键字有值，说明要做搜索分页
        let result
        if (searchName) {
            result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
        } else { // 一般分页请求
            result = await reqProducts(pageNum, PAGE_SIZE)
        }
        setLoading(false) // 隐藏loading
        if (result.status === 0) {
            // 取出分页数据，更新状态，显示分页列表
            const { total, list } = result.data
            setTotal(total)
            setProducts(list)
        }
    }
    useEffect(() => {
        getProducts(1)
    }, [])
    const title = (
        <span>
            <Select value={searchType} stule={{ width: 100 }} onChange={value => setSearchType(value)}>
                <Option value='productName'>按名称搜索</Option>
                <Option value='productDesc'>按描述搜索</Option>
            </Select>
            <Input placeholder='关键字' style={{ width: 150, margin: '0 15px' }} value={searchName} onChange={e => setSearchName(e.target.value)} />
            <Button type='primary' onClick={() => getProducts(1)}>搜索</Button>
        </span>
    )
    const extra = (
        <Button type='primary' onClick={()=>navigate(window.location.pathname+'/addupdate')}>
            <PlusOutlined />
            添加商品
        </Button>
    )
    return (
        <Card title={title} extra={extra}>
            <Table
                dataSource={products}
                columns={columns}
                rowKey='_id'
                bordered
                loading={loading}
                pagination={{
                    defaultPageSize: PAGE_SIZE,
                    showQuickJumper: true,
                    total,
                    onChange: getProducts
                }} />
        </Card>
    )
}
