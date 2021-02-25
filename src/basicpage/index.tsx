import React, { FC, useEffect } from 'react';
import { enable } from '../_util/inobounce';
import { isIos } from '../_util/device';

export interface IBasicpageProp {
  /**
   * @description 是否开启ios弹跳 默认 false
   * @default false
   */
  inobounce?: boolean
  /**
   * @description 样式
   */
  style?: React.CSSProperties
}

const PREFIX='leo-basic';

const Basicpage:FC<IBasicpageProp> = ({ children, inobounce, style }) => {
  useEffect(() => {
    if (inobounce === false && isIos()) {
      enable();
    }
  }, [inobounce]);

  return (
    <div className={PREFIX} style={style}>
      {children}
    </div>
  );
};

Basicpage.defaultProps = {
  inobounce: false,
};

export default Basicpage;

