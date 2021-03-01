import React, { FC, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { isPc } from '../_util/device';

const PREFIX = 'leo-drawer';

export interface IDrawerProp {
  /**
   * @description 头部组件
   */
  header?: React.ReactNode,
  /**
   * @description 是否启动弹性拉伸
   * @default false
   */
  flex?: boolean,
  /**
   * @description 是否启动遮罩层
   * @default false
   */
  mask?: boolean,
  /**
   * @description 显示和隐藏窗口
   * @default false
   */
  visible?: boolean,
  /**
   * @description 弹窗高度
   */
  contentHeight?: number,
  /**
   * @description 关闭回调
   */
  onClose?: ()=>void,
  /**
   * @description 是否点击遮罩层关闭
   * @default true
   */
  maskClosable?: boolean
  /**
   * @description 遮罩层子组件
   */
  maskChildren?: React.ReactNode
}

const pcEvent = {
  start: 'mousedown',
  move: 'mousemove',
  end: 'mouseup',
};
const mobileEvent = {
  start: 'touchstart',
  move: 'touchmove',
  end: 'touchend',
};
const Drawer: FC<IDrawerProp> = ({ header, flex, children, mask, visible,
  contentHeight=300, onClose, maskClosable, maskChildren }) => {
  const viewRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const clientHeight = useRef<number>(0);
  const [enter, setEnter] = useState(false);
  const [show, setShow] = useState(false);
  // const [isTop, setIsTop] = useState(false);
  const drag = useRef<boolean>(false);
  let startY = 0;
  let height = 0;
  const events:any = isPc() ? pcEvent : mobileEvent;
  useEffect(() => {
    if (visible === true) {
      clientHeight.current = document.documentElement.clientHeight;
      if (viewRef && viewRef.current) {
        viewRef.current.style.height = contentHeight + 'px';
      }
      // if (bodyRef && bodyRef.current) {
      //   bodyRef.current.style.height = contentHeight - 10 + 'px';
      // }
      if (flex) {
        initView();
      }
      // const timer: ReturnType<typeof setTimeout>= setTimeout(() => {
      //   const _t = flex ? clientHeight.current : clientHeight.current / 2;
      //   const _h = _t - headerRef.current!.offsetHeight - 10;
      //   bodyRef.current!.style.height = _h + 'px';
      // }, 50);
    }
    return () => {
      // clearTimeout(timer);
      if (flex) {
        viewRef.current?.removeEventListener(events.start, touchStart);
        viewRef.current?.removeEventListener(events.move, touchMove);
        viewRef.current?.removeEventListener(events.end, touchEnd);
      }
    };
  }, [enter]);
  useEffect(() => {
    if (show && maskRef && maskRef.current) {
      maskRef.current.style.height = document.documentElement.clientHeight + 'px';
    }
  }, [show]);
  useEffect(() => {
    if (visible === false) {
      if (enter === true) {
        setEnter(false);
      } else {
        setShow(false);
      }
    } else if (visible === true) {
      setShow(true);
    }
  }, [visible]);
  const initView = () => {
    if (viewRef && bodyRef && bodyRef.current) {
      viewRef.current?.addEventListener(events.start, touchStart);
      viewRef.current?.addEventListener(events.move, touchMove);
      viewRef.current?.addEventListener(events.end, touchEnd);
      bodyRef.current.style.overflow = 'hidden';
    }
  };
  const touchStart = (e: any) => {
    startY = isPc() ? e.clientY : e.touches[0].clientY;
    height = viewRef.current!.offsetHeight;
    drag.current = true;
  };
  const touchMove = (e: any) => {
    if (drag.current) {
      const clientY = isPc() ? e.clientY : e.touches[0].clientY;
      // 判断是否展开
      if (viewRef.current!.offsetHeight < clientHeight.current) {
        setHeight('step-start', '.1s', height - (clientY - startY));
      } else {
        // 展开状态
        if (clientY - startY > 0 && bodyRef.current!.scrollTop === 0) {
          // 向下拉动
          setHeight('step-start', '.1s', height - (clientY - startY));
        }
      }
    }
  };

  const touchEnd = (e: any) => {
    const clientY = isPc() ? e.clientY : e.changedTouches[0].clientY;
    // 判断拉动距离
    if (Math.abs(clientY - startY) < 120) {
      if (height < clientHeight.current) {
        // 没有展开状态 回弹到50%
        setHeight('linear', '.2s', contentHeight);
      } else {
        // 展开状态 回弹到100%
        setHeight('linear', '.2s', clientHeight.current);
      }
    } else {
      // 拉动超过设定距离
      if (clientY - startY < 0) {
        // 向上拉动
        setHeight('linear', '.2s', clientHeight.current);
        // setIsTop(true);
        bodyRef.current!.style.overflow = 'auto';
      } else {
        // 向下拉动
        if (bodyRef.current!.scrollTop === 0) {
          setHeight('linear', '.2s', contentHeight);
          // setIsTop(false);
          bodyRef.current!.style.overflow = 'hidden';
        };
      }
    }
    drag.current = false;
  };
  const setHeight = (ani: 'step-start' | 'linear', duration: string, _h: number) => {
    if (viewRef && viewRef.current) {
      viewRef.current.style.transitionTimingFunction = ani;
      viewRef.current.style.transitionDuration = duration;
      viewRef.current.style.height = _h + 'px';
    }
  };
  const onMaskClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (maskClosable && onClose) {
      onClose();
    }
  };

  const maskVeiw=()=>{
    if (!mask) return null;
    return (
      <div onClick={onMaskClick} ref={maskRef} className={`${PREFIX}-mask`}>
        {maskChildren}
      </div>
    );
  };

  return (
    <CSSTransition
      in={show}
      classNames={PREFIX}
      timeout={100}
      unmountOnExit
      onEntered={()=>{
        setEnter(true);
      }} >
      <div className={PREFIX} style={{ height: mask ? '100%' : contentHeight }}>
        {maskVeiw()}
        <CSSTransition
          in={enter}
          classNames={`${PREFIX}-body`}
          timeout={350}
          unmountOnExit
          onExited={()=>{
            setShow(false);
          }}
        >
          <div className={`${PREFIX}-body`} ref={viewRef}>
            {
              flex && <div className={`${PREFIX}-prompt`}>
                <div></div>
              </div>
            }
            <div className={`${PREFIX}-content`}>
              <div ref={headerRef} className={`${PREFIX}-content-header`}>
                {header}
              </div>
              <div ref={bodyRef} className={`${PREFIX}-content-body`}>
                {children}
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
};

Drawer.defaultProps = {
  flex: false,
  mask: false,
  maskClosable: true,
  visible: false,
  contentHeight: 300,
};

export default Drawer;
