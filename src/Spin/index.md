---
title: Spin 加载
group:
  title: Spin 加载
---

## Spin

加载浮层

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */

import React, { FC } from 'react';
import { Spin } from 'leo-design';
 
const App: FC = () => {
  return <div>
  <h1 style={{fontSize:14}}>基本用法</h1>
    <Spin />
    <h1 style={{fontSize:14}}>自定义文案</h1>
    <Spin tip={'加载中…'}>
    <p style={{height:100}}>Hello world!</p>
    </Spin>
  </div>
};
 
export default App;
```

<API/>