---
title: Modal 对话框
group:
  title: Modal 对话框
---

## Modal

对话框浮层

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */

import React, { FC, useState } from 'react';
import { Modal, Button } from 'leo-design';
 
const App: FC = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={()=>{setVisible(!visible)}} >{visible===false?'显示':'隐藏'}</Button>
      <Modal visible={visible} onClose={()=>setVisible(false)}>
        <div>
          hello world!
        </div>
      </Modal>
    </div>
  )
};
 
export default App;
```

<API/>