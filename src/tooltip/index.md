---
title: Tooltip 提示
group:
  title: Tooltip 提示
---

## Progress

线型进度条

## 代码演示

```tsx
import React, { FC } from 'react';
import { Tooltip } from 'leo-design';
 
const App: FC = () => {
  return <div style={{marginTop:100}}>
    <Tooltip placement='topLeft' visible={true} title={'提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字提示文字'}>
      <div style={{width:100}}>demo</div>
    </Tooltip>
  </div>
};
 
export default App;
```

<API/>