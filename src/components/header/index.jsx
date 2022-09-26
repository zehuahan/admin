import React, { useState } from 'react'
import './index.less'
import formateDate from '../../utils/dataUtils'
import memoryUtils from '../../utils/memoryUtils'
import { reqWeather } from '../../api'
import { Divider, Button } from 'antd'
import menuList from '../../config/menuConfig'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const date = new Date()

export default function Header() {
  const [reporttime, setReporttime] = useState() // 当前时间
  const [weather, setWeather] = useState()// 天气
  const [temperature, setTemperature] = useState() // 温度
  const [winddirection, setWinddirection] = useState()  // 风向
  const [windpower, setWindpower] = useState()  // 风速
  const [page, setPage] = useState() //当前页面

  const path = useLocation()

  const getWeather = async () => {
    const { weather, temperature, winddirection, windpower } = await reqWeather()
    setWeather(weather); setTemperature(temperature + '°C'); setWinddirection(winddirection); setWindpower(windpower)
  }
  /*启动循环定时器, 每隔 1s 更新一次 sysTime*/
  const getSysTime = () => {
    setInterval(() => {
      setReporttime(formateDate(date.toLocaleString()) + new Date().toTimeString().slice(0, 8))
    }, 1000)
  }
  const getPage = () => {
    menuList.map((item) => {
      if (item.key ===path.pathname) {
        setPage(item.title)
      }
      if (item.key === '/products' || item.key === '/charts') {
        item.children.map((item) => {
          if (item.key === path.pathname) {
            setPage(item.title)
          }
        })
      }
    })
  }
  useEffect(() => {
    getSysTime()
    getWeather()
    getPage()
  })
  // clearInterval(timer)
  return (
    <div className='header'>
      <div className="header-top">
        <span>欢迎，{memoryUtils.user.username}</span>
        <Button type='link'>退出</Button>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">{page}</div>
        <div className="header-bottom-right">
          <span>{reporttime}</span>
          <Divider type="vertical" />
          <span>天气：{weather}</span>
          <Divider type="vertical" />
          <span>温度：{temperature}</span>
          <Divider type="vertical" />
          <span>风向：{winddirection}</span>
          <Divider type="vertical" />
          <span>风级：{windpower}</span>
        </div>
      </div>
    </div>
  )
}