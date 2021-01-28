# Button

静态按钮

## 代码演示

```tsx
/**
 * background: '#f6f7f9'
 */

import React, { FC } from 'react';
import { Button } from 'leo-design';
import './style/index.ts';
 
const App: FC = () => {
  return <div>
    <span style={{marginRight:15}}>
      <Button>default</Button>
    </span>
    <span style={{marginRight:15}}>
      <Button type="primary">primary</Button>
    </span>
    <span style={{marginRight:15}}>
      <Button  disabled type="primary" loading>primary</Button>
    </span>
    <span style={{marginRight:15}}>
      <Button type="link">primary</Button>
    </span>
  </div>
};
 
export default App;
```

<API/>