# Carousel

竖行走马灯

## 代码演示

```tsx
import React, { FC } from 'react';
import { Carousel } from 'leo-design';
import './style/index.ts';
 
const arr=['demo1','demo2','demo3','demo4','demo5']
const App: FC = () => {
  
  return <>
    <Carousel content={arr}/>
  </>
};
 
export default App;
```

<API/>
