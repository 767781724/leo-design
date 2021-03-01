---
title: Drawer 抽屉
group:
  title: Drawer 抽屉
---

## Spin

屏幕底部 浮层面板

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */

import React, { FC, useState } from 'react';
import { Drawer, Button } from 'leo-design';
 
const App: FC = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={()=>{setVisible(!visible)}} >{visible===false?'显示':'隐藏'}</Button>
      <Drawer
        flex={true}
        visible={visible}
        mask={true}
        contentHeight={200}
        onClose={()=>{setVisible(false)}}
      >
      <Button onClick={()=>setVisible(false)}>取消</Button>
      <p>
      123<br/>
      123<br/>
      123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>123<br/>
      </p>
      
      </Drawer>
    </div>
  )
};
 
export default App;
```

<API/>