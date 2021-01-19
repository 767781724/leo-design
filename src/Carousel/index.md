# Carousel 走马灯

一个垂直走马灯效果

## 代码演示

```tsx
import React, { FC } from 'react';
import { Carousel } from 'leo-mobile-design';
 
const App: FC = () => {
  return <div>
    <Carousel content={[1,2,3,4,5]} />
  </div>;
};
 
export default App;
```

## API

| 属性        | 说明     | 类型                |
|-------------|--------|---------------------|
| content     | 滚动内容 | any[]               |
| InlineStyle | 行内样式 | React.CSSProperties |
| height      | 高度     | number              |
| speed       | 滚动速度 | number              |
| delay       | 延迟     | number              |
