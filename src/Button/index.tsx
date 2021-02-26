import React, { FC } from 'react';
import classNames from 'classnames';
import LoadingIcon from './loadingIcon';

export interface IButtonProp {
  /**
   * @description 类型
   * @default 'default'
   */
  type?: 'primary' | 'link' | 'default'
  /**
   * @description 设为块标签 宽度为父级宽度
   */
  block?: boolean
  /**
   * @description 按钮失效状态
   */
  disabled?: boolean
  /**
   * @description 按钮载入状态
   */
  loading?: boolean
  /**
   * @description 按钮点击回调
   */
  onClick?: React.MouseEventHandler<HTMLElement>
  /**
   * @description class
   */
  className?: string
  style?: React.CSSProperties
}

const PREFIX = 'leo-btn';

const Button: FC<IButtonProp> = (props) => {
  const { children, type, loading, className, block, disabled, onClick, style }=props;
  const classes = classNames(
      PREFIX,
      {
        [`${PREFIX}-${type}`]: type,
        [`${PREFIX}-block`]: block,
      },
      className,
  );
  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    if (loading) {
      return;
    }
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
    }
  };
  return (
    <button onClick={handleClick} disabled={disabled} className={classes} style={style}>
      <LoadingIcon loading={loading} prefix={PREFIX}/>
      <span>{children}</span>
    </button>
  );
};

Button.defaultProps={
};
export default Button;
