---
title: ListPage 分页加载
group:
  title: ListPage 分页加载
---

## ListPage

分页加载

## 代码演示

```tsx
/**
 * background: '#f6f7f9'
 */

import React, { FC, useRef } from 'react';
import { ListPage, Button } from 'leo-design';
 
type IDemo={
  name:string
}
let sub = 40;
let start = 0;
const App = () => {
  const ref = useRef<IListPageState>(null);
  const _query = (param) =>{
    const { page } =param;console.log(page)
    return new Promise((resolve)=>{
      setTimeout(()=>{
        if (page>3) {
          resolve({ data: { list: [] } });
        }
        if (page === 1) {
          sub = 40;
          start = 0;
        }
        const list = [];
        for (let i = start; i < sub; i++) {
          list.push({ name: i });
        }
        sub = sub + 40;
        start = start + 40;
        resolve({ data: { list } });
      }, 500);
    });
  };
  const _item = (e:IDemo, index:number) => {
    return <p key={index}>{e.name}</p>;
  };
  const _params = (data:any, page:number) =>{
    return { page: page };
  };
  const _queryCallback = (oldData: any, newData: any) => {
    return { newData: [...oldData, ...newData.data.list], more: oldData.length >100?false:true };
  };
  const _header = (e:any) =>{
    if (e.length===0) return null;
    return <p style={{ height: 50, background: 'blue' }}>头部</p>;
  };
  const _reset = () =>{
    ref.current?.resetList();
  };
  return (
    <div style={{ height: 400 }}>
      <ListPage
        ref = {ref}
        header={_header}
        item={_item}
        query={_query}
        params={_params}
        queryCallback={_queryCallback}
      />
      <Button block onClick={_reset} >重置</Button>
    </div>
  );
};
 
export default App;
```

<API/>