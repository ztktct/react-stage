import * as React from 'react';
// import Loadable from 'react-loadable';
const Loadable = require('react-loadable'); // why?

export default [{
  path: '/home',
  key: 'home',
  component: Loadable({
    // webpackChunkName 组件打包后的文件chunk名称
    loader: () => import(/* webpackChunkName: "home" */ '../pages/Home'),
    loading: () => <span>Loading 页面</span> // 页面未加载完成时默认显示loading
  })
}, {
  path: '/other',
  key: 'other',
  component: Loadable({
    // webpackChunkName 组件打包后的文件chunk名称
    loader: () => import(/* webpackChunkName: "other" */ '../pages/Other'),
    loading: () => <span>Loading 页面</span> // 页面未加载完成时默认显示loading
  })
}];
