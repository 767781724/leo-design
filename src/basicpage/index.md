---
title: Basicpage 基础页面
group:
  title: Basicpage 基础页面
---

## Basicpage

移动端基础页面（阻止ios页面弹性滚动）

## 代码演示

```tsx
import React, { FC } from 'react';
import { Basicpage } from 'leo-design';
 
const App: FC = () => {
  return (
    <div style={{height: '100vh'}}>
      <Basicpage inobounce={false} className={'demo'} >
        <p>
        滚动区域<br/>滚动区域<br/>滚动区域<br/>滚动区域<br/>滚动区域<br/>滚动区域<br/>滚动区域<br/>滚动区域<br/>滚动区域<br/>滚动区域<br/>滚动区域<br/>滚动区域<br/>滚动区域<br/>滚动区域<br/>滚动区域<br/>
        </p>
      </Basicpage>
    </div>
  )
};
 
export default App;
```

<API/>