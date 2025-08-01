import { useState } from 'react'
import './App.css'
import{
  Suspense,
  lazy,
} from 'react'
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import MainLayout from '@/components/MainLayout'
import BlankLayout from '@/components/BlankLayout'
import Loading from '@/components/Loading'
import ProtectRoute from '@/components/ProtectRoute'

const Home = lazy(() => import('@/pages/Home'))//首页
const Stacks = lazy(() => import('@/pages/Stacks'))//书库
const Ai = lazy(() => import('@/pages/Ai'))//智能助手
const Account = lazy(() => import('@/pages/Account'))//我的
const Detail = lazy(() => import('@/pages/Detail'))//详情页
const Search = lazy(() => import('@/pages/Search'))//搜索页
const Login = lazy(() => import('@/pages/Login'))//登录页



function App() {
  return (
    <>
       <Suspense fallback={<Loading/>}>
            {/* 你的网站可能由多套模板 */}
            {/* 带有tabbar的Layout */}
            <Routes >
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              
              <Route path="/stacks" element={
                  <ProtectRoute >
                    {/* 一个组件还包着一个组件 */}
                    <Stacks /> 
                    <div>123</div>
                    <div>456</div>
                  </ProtectRoute >
              }/>
              <Route path="/ai" element={
                    <ProtectRoute >
                    {/* 一个组件还包着一个组件 */}
                    <Ai /> 
                    <div>123</div>
                    <div>456</div>
                  </ProtectRoute >} />
              <Route path="/account" element={<Account />} />
            </Route>  
            
            {/* 不带tabbar的Layout */}
              <Route element={<BlankLayout />}>
                <Route path="/search" element={<Search />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>
       </Suspense>
    </>
  )
}

export default App
