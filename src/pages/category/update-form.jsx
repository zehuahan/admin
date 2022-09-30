import React, { useContext } from 'react'
import { Form, Input } from 'antd'
import Context from './context'
// 更新分类的form组件
const UpdateForm=(props)=>{
    let { categoryName} = useContext(Context)
    const blurInp = (e) => {
        props.fom(e.target.value) 
    }
    return (
        <div>
            <Form preserve={false} initialValues={categoryName}>
                <Form.Item rules={[
                    { require: true, message: '分类名称必须输入' },
                    { min: 1, message: '' },
                ]}>
                    <Input type="text" placeholder={categoryName.name} onBlur={(e) => blurInp(e)} />
                </Form.Item>
            </Form>
        </div>
    )
}
export default UpdateForm