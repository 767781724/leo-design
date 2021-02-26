import React, { FC, useEffect } from 'react';
import { enable } from '../_util/inobounce';
import { isIos } from '../_util/device';
import classNames from 'classnames';

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
  className?: string
}

const PREFIX='leo-basic';

const Basicpage:FC<IBasicpageProp> = ({ children, inobounce, style, className }) => {
  useEffect(() => {
    if (inobounce === false && isIos()) {
      enable();
    }
  }, [inobounce]);

  return (
    <div className={classNames(PREFIX, className)} style={style}>
      {children}
    </div>
  );
};

Basicpage.defaultProps = {
  inobounce: false,
};

export default Basicpage;

