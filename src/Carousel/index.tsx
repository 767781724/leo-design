import React, { useEffect, useRef, useMemo } from 'react';

const PREFIX = 'leo-carousel';

export interface ICarouselProps {
  /**
   * @description 内容
   */
  content: any[]
  /**
   * @description 行内样式
   */
  InlineStyle?: React.CSSProperties
  /**
   * @description 行高
   * @default 32px
   */
  height?: string | number
  /**
   * @description 速度
   */
  speed?: number
  /**
   * @description 延迟
   */
  delay?: number
}
/**
 * 走马灯
 * @param {ICarouselProps}
 * @return {ReactNode}
 */
const Carousel= (
    { content, InlineStyle, height, speed = 1, delay = 3 }:ICarouselProps) => {
  const ulRef = useRef<HTMLUListElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const time = useRef<ReturnType<typeof setTimeout>>();
  const interTime = useRef<ReturnType<typeof setInterval>>();
  const animation = useRef<boolean>(true);// 动画是否正在播放
  const num = useRef<number>(0);
  const start = () => {
    const contentBox = ulRef.current;
    if (contentBox === null || content.length <= 1) return;
    const rowHeight = wrapRef.current?.getBoundingClientRect().height;
    animation.current = true;
    interTime.current = setInterval(() => {
      if (animation.current && rowHeight) {
        if (num.current === contentBox.children.length - 1) {
          num.current = 1;
        } else {
          num.current++;
        }
        const _top = Math.floor(num.current * (-rowHeight));
        ani(_top);
      }
    }, delay * 1000);
  };
  const clearTime= ()=>{
    if (time.current) {
      clearTimeout(time.current);
    }
    if (interTime.current) {
      clearInterval(interTime.current);
    }
  };
  useEffect(() => {
    start();
    return () => {
      clearTime();
    };
  }, []);
  /**
   * 动画效果
   * @param {any} this
   * @param {number} top
   * @this ani
   */
  function ani(this: any, top: number) {
    const contentBox = ulRef.current;
    if (contentBox === null) return;
    const scrollTop = contentBox.offsetTop - speed;
    if (scrollTop <= top) {
      console.log(scrollTop, top);
      if (time.current) {
        clearTimeout(time.current);
      }
      if (num.current===contentBox.children.length-1) {
        contentBox.style.top = `0px`;
      }
      animation.current = true;
      return;
    } else {
      animation.current = false;
      contentBox.style.top = `${scrollTop}px`;
    }
    // time.current = requestAnimationFrame(ani.bind(this, top))
    time.current = setTimeout(ani.bind(this, top), 10);
  }
  const lis=useMemo(() => {
    const arr=content.length>1?content.concat(content[0]):content;
    return arr.map((item, index) => {
      return (
        <li
          style={{ ...InlineStyle, height: height }}
          className={`${PREFIX}-item`} key={index}>
          {item}
        </li>
      );
    });
  }, [content]);
  return (
    <div className={PREFIX} style={{ height: height }} ref={wrapRef}>
      <ul className={`${PREFIX}-wrap`} ref={ulRef}>
        {lis}
      </ul>
    </div>
  );
};

export default Carousel;
