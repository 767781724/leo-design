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
import React, { useRef } from 'react';
import { ListPage, Basicpage } from 'leo-design';
import { IListPageState } from 'leo-design/lib/list-page';

type IDemo={
  name:string
}
let sub = 40;
let start = 0;
let num:any[] = [];
const App = () => {
  const ref = useRef<IListPageState>(null);
  const _query = (param:any) =>{
    const { page } =param;
    if (page === 1) {
        sub = 40;
        start = 0;
        num= [];
      }
    num.push(page);
    return new Promise((resolve)=>{
      setTimeout(()=>{
        if (page>3) {
          resolve({ data: { list: [] } });
        }
        const list = [];
        for (let i = start; i < sub; i++) {
          list.push({ name: i });
        }
        sub = sub + 40;
        start = start + 40;
        resolve({ data: { list } });
      }, 2000);
    });
  };
  const _item = (e:IDemo, index:number) => {
    return <p key={index}>{e.name}</p>;
  };
  const _params = (data:any, page:number) =>{
    return { page: page };
  };
  const _queryCallback = (oldData: any, newData: any) => {
    return { newData: [...oldData, ...newData.data.list], more: true };
  };
  return (
    <div style={{height: '99vh'}}>
      <Basicpage>
        <ListPage
          ref = {ref}
          item={_item}
          query={_query}
          params={_params}
          queryCallback={_queryCallback}
        />
      </Basicpage>
    </div>
  );
};

export default App;
```

<API/>