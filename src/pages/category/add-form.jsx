import React, { useContext } from 'react'
import { Form, Select, Input } from 'antd'
import Context from './context'

// 添加分类的form组件
const AddForm=(props)=>{
    const Option = Select.Option
    let { categorys, parentId, parentName } = useContext(Context)
    const blurInp = (e) => {
        props.add(e.target.value, parentId)
    }
    return (
        <div>
            <Form >
                <Form.Item label='所属分类'>
                    <Select
                        defaultValue={parentName || "0"}
                        dropdownMatchSelectWidth={false}
                    >
                        <Option value="0">一级分类</Option>
                        {
                            categorys.map(c => <Option key={c._id}
                                value={c._id}>{c.name}</Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item label='分类名称'>
                    <Input type="text" placeholder='请输入分类名称' onBlur={(e) => blurInp(e)} key={parentId}/>
                </Form.Item>
            </Form>
        </div>
    )
}
export default AddForm