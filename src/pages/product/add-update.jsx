import React, { useEffect, useState } from 'react'
import { Card, Form, Input, Cascader, Upload, Button } from 'antd'
import { ArrowLeftOutlined } from "@ant-design/icons";
import { reqCategorys } from '../../api'

const optionLists = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    isLeaf: false,
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    isLeaf: false,
  },
];

// 添加和更新的子路由
export default function ProductAddUpdate() {
  // 级联选择
  const [options, setOptions] = useState();

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  const loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true; // load options lazily

    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: 'dynamic1',
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: 'dynamic2',
        },
      ];
      setOptions([...options]);
    }, 1000);
  };
  // ==================================================================================
  const initOptions = (categorys) => {
    // 根据categorys生成options数组
    const options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false,
    }))
    // 更新options状态
    setOptions([...options]);
  }
  // 异步获取一级/二级列表，并显示
  const getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId)
    if (result.status === 0) {
      const categorys = result.data
      initOptions(categorys)
    }
  }

  const [form] = Form.useForm()
  const { Item } = Form
  const { TextArea } = Input
  const title = (
    <span>
      <Button type='link'>
        <ArrowLeftOutlined style={{ color: 'green', fontSize: 20 }} />
      </Button>
      <span>添加商品</span>
    </span>
  )
  // 指定item布局的配置对象
  const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 6 }
  }
  const onFinish = (error, values) => {
    if (!error) {
      alert('发送请求')
    } else {
      alert('错误')
    }
  };
  // 验证价格的的自定义验证函数
  const validatePrice = (rule, value, callback) => {
    if (value * 1 > 0) {
      callback() // 验证通过
    } else {
      callback('价格必须大于0') //验证没通过
    }
  }
  useEffect(() => {
    getCategorys('0')
  })
  return (
    <Card title={title}>
      <Form {...formItemLayout} form={form} onFinish={onFinish}>
        <Item label='商品名称'
          name='name'
          rules={[
            { required: true, message: '必须输入商品名称' }
          ]}>
          <Input placeholder='请输入商品名称' />
        </Item>
        <Item label='商品描述'
          name='desc'
          rules={[
            { required: true, message: '必须输入商品描述' }
          ]}>
          <TextArea placeholder='请输入商品描述' autoSize={{ minRows: 2, maxRows: 6 }} />
        </Item>
        <Item label='商品价格'
          name='price'
          rules={[
            { required: true, message: '必须输入商品价格' },
            { validator: { validatePrice } }
          ]}>
          <Input type='number' placeholder='请输入商品价格' addonAfter='元' />
        </Item>
        <Item label='商品分类'>
          <Cascader options={options} loadData={loadData} onChange={onChange} changeOnSelect />
        </Item>
        <Item label='商品图片'>
          <div>商品图片</div>
        </Item>
        <Item label='商品详情'>
          <div>商品详情</div>
        </Item>
        <Item>
          <Button type='primary' htmlType="submit">提交</Button>
        </Item>
      </Form>
    </Card>
  )
}
