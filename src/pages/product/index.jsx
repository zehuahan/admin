import React from 'react'
import {Routes,Route} from 'react-router-dom'
import ProductHome from './home'
import ProductAddUpdate from './add-update'
import ProductDetail from './detail'
import './product.less'

export default function index() {
  return (
    <Routes>
      <Route path='' element={<ProductHome/>}></Route>
      <Route path='addupdate' element={<ProductAddUpdate/>}></Route>
      <Route path='detail' element={<ProductDetail/>}></Route>
    </Routes>
  )
}
