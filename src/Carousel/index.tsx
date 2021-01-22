import React, { FC, useEffect, useRef, useState } from 'react';

const PREFIX = 'leo-carousel';

export interface ICarouselProps {
  content?: any[]
  InlineStyle?: React.CSSProperties
  height?: string | number
  speed?: number
  delay?: number
}
/**
 * 走马灯
 * @param {ICarouselProps}
 * @return {ReactNode}
 */
const Carousel:FC<ICarouselProps>= (
    { content, InlineStyle, height = 30, speed = 1, delay = 3 }:ICarouselProps) => {
  const ulRef = useRef<HTMLUListElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const time = useRef<any>();
  const [data, setdata] = useState<Array<any>>([]);
  const interTime = useRef<any>();
  const isEnds = useRef<boolean>(true);
  const num = useRef<number>(0);
  const start = () => {
    const _uls = ulRef.current!;
    const _liHeight = wrapRef.current?.getBoundingClientRect().height;
    isEnds.current = true;
    interTime.current = setInterval(() => {
      if (isEnds.current && _liHeight) {
        if (num.current === _uls.children.length - 1) {
          num.current = 1;
        } else {
          num.current++;
        }
        const _top = num.current * (-_liHeight);
        ani(_top);
      }
    }, delay * 1000);
  };
  useEffect(() => {
    if (content && content.length > 1) {
      content.push(content[0]);
      setdata(content);
      start();
      return () => {
        clearTimeout(time.current);
        clearInterval(interTime.current);
      };
    }
  }, [content]);
  useEffect(() => {
    window.onblur = () => {
      clearTimeout(time.current);
      clearInterval(interTime.current);
    };
    window.onfocus = () => {
      start();
    };
    return () => {
      window.onblur = null;
      window.onfocus = null;
    };
  }, []);
  /**
   * 动画效果
   * @param {any} this
   * @param {number} top
   * @this ani
   */
  function ani(this: any, top: number) {
    const _uls = ulRef.current;
    if (!_uls) return;
    const _top = _uls.offsetTop - speed;
    const _liHeight = wrapRef.current?.getBoundingClientRect().height;
    if (_top < top) {
      clearTimeout(time.current);
      isEnds.current = true;
      const _h=_uls.getBoundingClientRect().height - _liHeight!;
      if (Math.abs(_top) >= _h) {
        ulRef.current!.style.top = `0px`;
      }
      return;
    } else {
      isEnds.current = false;
      ulRef.current!.style.top = `${_top}px`;
    }
    // time.current = requestAnimationFrame(ani.bind(this, top))
    time.current = setTimeout(ani.bind(this, top), 10);
  }
  return (
    <div className={PREFIX} style={{ height: height }} ref={wrapRef}>
      <ul className={`${PREFIX}-wrap`} ref={ulRef}>
        {
          data.map((item, index) => {
            return (
              <li
                style={{ ...InlineStyle, height: height }}
                className={`${PREFIX}-item`} key={index}>
                {item}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Carousel;
