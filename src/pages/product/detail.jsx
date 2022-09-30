import React, { useState } from 'react'
import { Button, Card, List } from 'antd'
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_IMG_PATH } from '../../utils/constants';
import { reqCategory } from '../../api'

// 详情子路由
export default function ProductDetail() {
  const navigate = useNavigate()
  const [cname1, setCname1] = useState()
  const [cname2, setCname2] = useState()
  const { state: products } = useLocation()
  const { name, desc, price, imgs, detail } = products
  // 得到当前商品分类id
  const getfl = async () => {
    const { pCategoryId, categoryId } = products
    if (pCategoryId === 0) {    // 一级分类下的商品
      const result = await reqCategory(pCategoryId)
      setCname1(result.data.name)
    } else { // 二级分类下的商品
      // 一次性发送多个请求，只有成功才正常处理
      const results= await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
      setCname1(results[0].data.name)
      setCname2(results[1].data.name)
    }
  }
  getfl()
  const Item = List.Item
  const title = (
    <span>
      <Button type='link'><ArrowLeftOutlined style={{ color: 'green', marginRight: 15, fontSize: 20 }} onClick={() => navigate(-1)} /></Button>
      <span>商品名称</span>
    </span>
  )

  return (
    <Card title={title} className='product-detail'>
      <List>
        <Item>
          <span className='left'>商品名称：</span>
          <span>{name}</span>
        </Item>
        <Item>
          <span className='left'>商品描述：</span>
          <span>{desc}</span>
        </Item>
        <Item>
          <span className='left'>商品价格：</span>
          <span>¥{price}</span>
        </Item>
        <Item>
          <span className='left'>所属分类：</span>
          <span>{cname1} {cname2 ? ' --> ' + cname2 : ''}</span>
        </Item>
        <Item>
          <span className='left'>商品图片：</span>
          <span>
            {imgs.map(img => (
              <img src={BASE_IMG_PATH + img} alt='img' className='product-img' key={img} />
            ))}
          </span>
        </Item>
        <Item>
          <span className='left'>商品详情：</span>
          <span dangerouslySetInnerHTML={{ __html: detail }}></span>
        </Item>
      </List>
    </Card>
  )
}
