---
title: Carousel 走马灯
group:
  title: Carousel 走马灯
---

## Carousel

竖行走马灯

## 代码演示

```tsx
/**
 * background: '#f6f7f9'
 */
import React, { FC } from 'react';
import { Carousel } from 'leo-design';
 
const arr=['demo1','demo2','demo3','demo4','demo5']
const App: FC = () => {
  
  return <div style={{backgroundColor: 'orange'}}>
    <Carousel content={arr}/>
  </div>
};
 
export default App;
```

<API/>
