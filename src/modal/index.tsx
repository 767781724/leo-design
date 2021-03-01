import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';

export interface IModalProp {
  /**
   * @description 显示和隐藏窗口
   * @default false
   */
  visible?: boolean,
   /**
   * @description 关闭回调
   */
  onClose?: ()=>void
  /**
   * @description 是否点击遮罩层关闭
   * @default true
   */
  maskClosable?: boolean
  style?: React.CSSProperties
  maskStyle?: React.CSSProperties
}
const PREFIX = 'leo-modal';
const Modal:FC<IModalProp> = ({ children, visible, onClose, maskClosable, style, maskStyle }) => {
  const maskOnClose=()=>{
    if (maskClosable) {
      onClose&&onClose();
    }
  };
  return (
    <CSSTransition
      in={visible}
      classNames={PREFIX}
      timeout={100}
      unmountOnExit >
      <div className={PREFIX} style={style}>
        <div className={`${PREFIX}-mask`} style={maskStyle} onClick={maskOnClose}></div>
        <div className={`${PREFIX}-body`}>
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

Modal.defaultProps = {
  visible: false,
  maskClosable: true,
};

export default Modal;
