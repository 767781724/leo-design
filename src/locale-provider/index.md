---
title: LocaleProvider 多语言
group:
  title: LocaleProvider 多语言
---

## LocaleProvider

国际化，多语言

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import React, { FC } from 'react';
import { LocaleProvider, Button } from 'leo-design';
import { withLocal, IWithLocaleProp, setLang } from 'leo-design/lib/locale-provider';

interface IDemoProp extends IWithLocaleProp<II18nProp>{

}
const Demo:FC<IDemoProp> = ({ t }) =>{
  const [lang, setNewLang]= setLang();
  return (
    <div>
      <Button onClick={()=>setNewLang(lang==='zh'?'en':'zh')}>切换</Button>
      <p>{lang}</p>
      <p>{t.name}</p>
    </div>
  );
};

const Demopage=withLocal(Demo);

interface II18nProp{
  name:string
}
interface IDemoI18n{
  [key:string]: II18nProp
}
const _i18n:IDemoI18n={
  'zh': {
    name: '中国',
  },
  'en': {
    name: '英国',
  },
};
const App: FC = () => {
  return (
    <LocaleProvider i18n={_i18n} defaultLang={'zh'}>
      <Demopage/>
    </LocaleProvider>
  );
};

export default App;

```

<API/>