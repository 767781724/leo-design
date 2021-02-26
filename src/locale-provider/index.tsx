import React, { createContext, useContext, useState, FC, ComponentType } from 'react';

interface IBaseProps {
  lang: string,
  pack: {
    [key: string]: any
  },
  getMessages?: () => any,
  setNewLang: (newLang: string) => void,
}
const Context = createContext<IBaseProps>({
  lang: 'en',
  pack: {},
  setNewLang: (e) => {},
});
interface ILocaleProviderProp {
  i18n: {
    [key: string]: any
  },
  defaultLang?: string
}

const LocaleProvider:FC<ILocaleProviderProp>=({ i18n, children, defaultLang })=>{
  if (Object.keys(i18n).length===0) {
    throw new Error('No i18n provide.');
  }
  const [lang, setLang] = useState<string>(() => {
    if (defaultLang && i18n.hasOwnProperty(defaultLang)) return defaultLang;
    const currentLang = Object.keys(i18n)[0];
    return currentLang;
  });
  const [pack, setPack] = useState(i18n[lang]);
  // useEffect(() => {
  //   setPack(i18n[lang]);
  // }, []);
  const getMessages = () => {
    return pack;
  };

  const setNewLang = (newLang: string) => {
    if (i18n.hasOwnProperty(newLang)) {
      setLang(newLang);
      setPack(i18n[newLang]);
    }
  };
  const l = i18n[lang];
  return (
    <Context.Provider
      value={{
        lang,
        pack: pack as typeof l,
        getMessages,
        setNewLang,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default LocaleProvider;


export const useLocale = () => {
  const { pack } = useContext(Context);

  return pack;
};
/**
 * 设置语言
 * @return {Array}
 */
export function setLang():[string, (e:string)=>void] {
  const { lang, setNewLang } = useContext(Context);

  return [lang, setNewLang];
};
export interface IWithLocaleProp<T = any> {
  t:T
}
export const withLocal = <T extends IWithLocaleProp>(BaseComponent:ComponentType<T>) =>{
  const newComponent =(props:Omit<T, keyof IWithLocaleProp>)=>{
    const t = useLocale();
    return (
      <BaseComponent {...props as T} t={t}/>
    );
  };
  return newComponent;
};

