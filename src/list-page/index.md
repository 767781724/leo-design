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
import { ListPage } from 'leo-design';
 
type IDemo={
  name:string
}
let sub = 40;
let start = 0;
const App = () => {
  const _query = () =>{
    return new Promise((resolve)=>{
      setTimeout(()=>{
        const list = [];
        for (let i = start; i < sub; i++){
          list.push({name: i});
        }
        sub = sub + 40;
        start = start +40;
        resolve({ data: { list } });
      }, 5000);
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
  return (
    <div style={{ height: 400 }}>
      <ListPage
        item={_item}
        query={_query}
        params={_params}
        queryCallback={_queryCallback}
      >
      </ListPage>
    </div>
  );
};
 
export default App;
```

<API/>