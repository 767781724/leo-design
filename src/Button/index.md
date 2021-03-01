---
title: Button 按钮
group:
  title: Button 按钮
---

## Button

静态按钮

## 代码演示

```tsx
/**
 * background: '#f6f7f9'
 */

import React, { FC } from 'react';
import { Button } from 'leo-design';
 
const App: FC = () => {
  return <div>
      <Button block={true} style={{marginBottom:10}}>default</Button>
      <Button block={true} style={{marginBottom:10, background:'red'}} type="primary">primary</Button>
      <Button block={true} style={{marginBottom:10}} disabled type="primary" loading>primary</Button>
      <Button block={true} style={{marginBottom:10}} type="link">primary</Button>
  </div>
};
 
export default App;
```

<API/>