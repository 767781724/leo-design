# Spin

加载浮层

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */

import React, { FC } from 'react';
import { Spin } from 'leo-design';
import './style/index.ts';
 
const App: FC = () => {
  return <div>
    <Spin />
  </div>
};
 
export default App;
```

## 自定义描述文案

```tsx
/**
 * background: '#f6f7f9'
 */

import React, { FC } from 'react';
import { Spin } from 'leo-design';
import './style/index.ts';
 
const App: FC = () => {
  const icon=<div>loading</div>
  return <div>
    <Spin isCard={true} tip={'加载中…'}>
    <p>Hello Leo!</p>
    </Spin>
  </div>
};
 
export default App;
```

## 自定义指示符

```tsx
/**
 * background: '#f6f7f9'
 */

import React, { FC } from 'react';
import { Spin } from 'leo-design';
import './style/index.ts';
 
const App: FC = () => {
  const icon=<div>loading…</div>
  return <div>
    <Spin indicator={icon}>
    <p>Hello Leo!</p>
    </Spin>
  </div>
};
 
export default App;
```

<API/>