import React, { FC, useEffect, useRef, useState } from 'react';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';

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
}
export interface IListPageQueryback {
  newData: Array<any>
  more: boolean
}
const PREFIX = 'leo-listpage';

const ListPage:FC<IListPageProp> = ({ header, footer, empty, noMore,
  params, queryCallback, query, item }) => {
  const wrap = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState<Array<any>>([]);
  const page = useRef(1);
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (hasMore && wrap.current) {
      wrap.current.onscroll = onScroll;
    }
    if (head.current && body.current && wrap. current) {
      const headHeight = Math.floor(head.current.getBoundingClientRect().height);
      wrap.current.style.top=`${headHeight}px`;
    }
    return () => {
      if (wrap.current) {
        wrap.current!.onscroll = null;
      }
    };
  }, [hasMore, data, loading, header]);
  const getData = () => {
    const _param = params(data, page.current);
    setLoading(true); console.log(_param);
    query(_param).then((res) => {
      const { newData, more } = queryCallback(data, res);
      setData(newData);
      if (more) {
        page.current++;
      } else {
        setHasMore(false);
      }
    }).finally(() => setLoading(false));
  };
  const onScroll = () => {
    if (body.current && wrap.current) {
      const bodyHeight = Math.floor(body.current.getBoundingClientRect().height);
      const wrapHeight = Math.floor(wrap.current.getBoundingClientRect().height);
      const scrollTop = Math.floor(wrap.current.scrollTop);
      if (bodyHeight <= (scrollTop + wrapHeight) && hasMore && !loading) {
        getData();
      }
    }
  };
  const _footer = () => {
    if (hasMore) {
      if (loading) return footer ? footer : <FooterView />;
    } else {
      if (data.length>0) {
        return noMore ? noMore :<NoMoreView/>;
      } else {
        return empty ? empty : <EmptyView/>;
      }
    }
  };
  return (
    <div className={PREFIX} >
      {/* {header&&<div ref={head}>{header}</div>} */}
      {
        !!header &&
        <div ref={head} className={`${PREFIX}-header`}>
          {header(data)}
        </div>
      }
      <div className={`${PREFIX}-body`} ref={wrap}>
        <div className={`${PREFIX}-body-content`} ref={body}>
          {data?.map((e, index)=>item(e, index))}
        </div>
        { _footer() }
      </div>
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

export default ListPage;


