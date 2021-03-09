import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { LoadingOutlined, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Message } from '../index';
import { isPc } from '../_util/device';
import { IListPageProp, IListPageState, IRefreshProp, IRefreshStatus } from './types';


const pcEvent = {
  start: 'mousedown',
  move: 'mousemove',
  end: 'mouseup',
};
const mobileEvent = {
  start: 'touchstart',
  move: 'touchmove',
  end: 'touchend',
};
const PREFIX = 'leo-listpage';
/**
 * 分页
 * @param props
 * @param ref
 * @return {React.ReactNode}
 */
function IListPage(props:IListPageProp, ref: React.ForwardedRef<IListPageState>) {
  const { header, footer, empty, noMore, params, queryCallback, query, item, refresh,
    threshold, maxPullValue } =props;
  const wrap = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const refreshView = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState<Array<any>>([]);
  // off下拉箭头 on松开刷新 loading刷新
  const [pullStatus, setpullStatus] = useState<IRefreshStatus>('off');
  const page = useRef(1);
  const loadCache = useRef(false);
  const startY = useRef(0);
  const pullLength = useRef(0);
  const drag = useRef(false);
  const isRefresh = useRef(false);
  const events = isPc() ? pcEvent : mobileEvent;
  useImperativeHandle(ref, () => ({
    refreshData,
  }), [],
  );
  const touchStart = (e: any) =>{
    if (body.current) {
      const _scroll = body.current.scrollTop;
      startY.current = isPc() ? e.clientY : e.touches[0].clientY;
      if (isRefresh.current === false && loadCache.current===false && _scroll < 10) {
        drag.current = true;
      }
      if (content.current && refreshView.current) {
        content.current.style.transition= 'transform 0s';
        refreshView.current.style.transition= 'transform 0s';
      }
    }
  };
  const touchMove = (e: any) =>{
    if (drag.current) {
      const _y=isPc() ? e.clientY : e.touches[0].clientY;
      pullLength.current = _y - startY.current;
      if (pullLength.current>0 && pullLength.current <= maxPullValue! &&
        content.current && refreshView.current) {
        content.current.style.transform= `translateY(${pullLength.current}px)`;
        const _y=pullLength.current-refreshView.current.offsetHeight;
        refreshView.current.style.transform= `translateY(${_y}%)`;
      }
      if (pullLength.current >= threshold!) {
        setpullStatus('on');
      } else {
        setpullStatus('off');
      }
    }
  };
  const touchEnd = (e: any) =>{
    drag.current = false;
    if (content.current && refreshView.current) {
      content.current.style.transition= 'transform 0.6s ease';
      if (pullLength.current >= threshold!) {
        refreshData();
      } else {
        content.current.style.transform= 'translateY(0px)';
        refreshView.current.style.transform= `translateY(-100%)`;
      }
      pullLength.current = 0;
    }
  };
  const refreshData = () =>{
    page.current=1;
    setpullStatus('loading');
    getData(true);
    setHasMore(true);
    if (body.current && content.current && refreshView.current) {
      body.current.scrollTop=0;
      isRefresh.current=true;
      content.current.style.transform= `translateY(${threshold}px)`;
      refreshView.current.style.transform= `translateY(0%)`;
    }
  };
  useEffect(() => {
    refreshData();
    if (wrap.current) {
      wrap.current.addEventListener(events.start, touchStart);
      wrap.current.addEventListener(events.move, touchMove);
      wrap.current.addEventListener(events.end, touchEnd);
    }
  }, []);
  useEffect(() => {
    if (hasMore && body.current) {
      body.current.onscroll = onScroll;
    }
    if (head.current && content.current && body. current) {
      const headHeight = Math.floor(head.current.getBoundingClientRect().height);
      body.current.style.top=`${headHeight}px`;
    }
    return () => {
      if (body.current) {
        body.current!.onscroll = null;
      }
    };
  }, [hasMore, data, loading, header]);
  const getData = (reset:boolean = false) => {
    loadCache.current= true;
    const _param = params(data, page.current);
    query(_param).then((res) => {
      const { newData, more } = queryCallback(reset?[]:data, res);
      if (more) {
        page.current++;
        if (newData.length === data.length) setHasMore(false);
      } else {
        setHasMore(false);
      }
      setData(newData);
    }).catch((err)=>{
      Message.error(err.msg);
    }).finally(() => {
      setLoading(false);
      loadCache.current= false;
      if (isRefresh && content.current && refreshView.current) {
        isRefresh.current = false;
        content.current.style.transform= 'translateY(0px)';
        refreshView.current.style.transform= `translateY(-100%)`;
      }
    });
  };
  const onScroll = () => {
    if (content.current && body.current) {
      const contentHeight = Math.floor(content.current.getBoundingClientRect().height);
      const bodyHeight = Math.ceil(body.current.getBoundingClientRect().height);
      const scrollTop = Math.ceil(body.current.scrollTop);
      if (contentHeight <= (scrollTop + bodyHeight) && hasMore && loadCache.current===false) {
        setLoading(true);
        getData();
      }
    }
  };
  return (
    <div className={PREFIX} ref={wrap} >
      {
        !!header &&
        <div ref={head} className={`${PREFIX}-header`}>
          {header(data)}
        </div>
      }
      <div className={`${PREFIX}-body`} ref={body}>
        <div className={`${PREFIX}-body-refresh`} ref={refreshView}>
          {refresh?refresh:<RefreshView status={pullStatus}/>}
        </div>
        <div className={`${PREFIX}-body-content`} ref={content}>
          {data?.map((e, index)=>item(e, index))}
        </div>
        {hasMore===false && data.length===0 && (empty ? empty : <EmptyView/>)}
        {hasMore===false && data.length > 0 &&(noMore ? noMore :<NoMoreView/>)}
      </div>
      <div className={`${PREFIX}-footer`} >
        {hasMore && loading && (footer ? footer : <FooterView />)}
      </div>
    </div>
  );
};

const RefreshView = ({ status }: IRefreshProp) =>{
  const view = () =>{
    if (status === 'off') {
      return <React.Fragment>
        <span><ArrowDownOutlined /></span>
        <span>Pull down to refresh</span>
      </React.Fragment>;
    } else if (status === 'on') {
      return <React.Fragment>
        <span><ArrowUpOutlined /></span>
        <span>Release to refresh</span>
      </React.Fragment>;
    } else {
      return <React.Fragment>
        <span><LoadingOutlined/></span>
        <span>Refreshing</span>
      </React.Fragment>;
    }
  };
  return (
    <div className={`${PREFIX}-body-refresh-default`}>
      {view()}
    </div>
  );
};
const FooterView = () => {
  return (
    <div className={`${PREFIX}-footer-default`}>
      <span><LoadingOutlined/></span>
      <span>Load more</span>
    </div>
  );
};
const NoMoreView = () => {
  return (
    <div className={`${PREFIX}-noMore-default`}>
      <span>No More</span>
    </div>
  );
};
const EmptyView = () => {
  return (
    <div className={`${PREFIX}-empty-default`}>
      <span>No Data</span>
    </div>
  );
};
const ListPage=forwardRef<IListPageState, IListPageProp>(IListPage);
ListPage.defaultProps = {
  threshold: 60,
  maxPullValue: 150,
};
export default ListPage;
