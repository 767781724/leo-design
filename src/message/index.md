---
title: Message 提示
group:
  title: Message 提示
---

## Message

全局展示操作反馈信息

## 代码演示

```tsx
import React, { FC } from 'react';
import { Message,Button } from 'leo-design';
 
const App: FC = () => {
  return (
    <div>
    <Button block={true} style={{marginBottom:10}} onClick={()=>{
      Message.success('hello')
    }}>success</Button>
    <Button block={true} style={{marginBottom:10}} onClick={()=>{
      Message.info('hello')
    }}>info</Button>
    <Button block={true} style={{marginBottom:10}} onClick={()=>{
      Message.error('hello')
    }}>error</Button>
    <Button block={true} style={{marginBottom:10}} onClick={()=>{
      Message.warning('hello')
    }}>warning</Button>
    <Button block={true} style={{marginBottom:10}} onClick={()=>{
      Message.loading('hello')
    }}>loading</Button>
     <Button block={true} style={{marginBottom:10}} onClick={()=>{
      Message.destroy()
    }}>destory</Button>
    </div>
  )
};
 
export default App;
```

