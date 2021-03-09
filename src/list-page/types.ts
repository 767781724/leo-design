import React from 'react';

export interface IListPageState {
  refreshData: () => void
}
export interface IListPageProp {
  /**
   * @description 头部视图
   */
  header?: (e:any)=> React.ReactNode | null
  /**
   * @description 底部加载动画
   */
  footer?: React.ReactNode
  /**
   * @description 空数据视图
   */
  empty?: React.ReactNode
  /**
   * @description 没有更多底部视图
   */
  noMore?: React.ReactNode
  /**
   * @description 下拉刷新视图
   */
  refresh?: (e:IRefreshStatus) => React.ReactNode
  /**
   * @description 行视图
   */
  item: (e: any, index:number) => React.ReactNode
  /**
   * @description 数据请求接口
   */
  query: (data:any) => Promise<any>
  /**
   * @description 数据请求参数
   */
  params: (data:any, page:number) => Object
  /**
   * @description 数据请求回调
   */
  queryCallback: (oldData:Array<any>, newData: any)=> IListPageQueryback
  /**
   * @description 下拉刷新临界值
   * @default 60
   */
  threshold?: number
  /**
   * @description 下拉刷新临界值
   * @default 150
   */
  maxPullValue?: number
}
export interface IListPageQueryback {
  newData: Array<any>
  more: boolean
}
export type IRefreshStatus = 'on' | 'off' | 'loading';
export type IRefreshProp = {
  status: IRefreshStatus
}
