import React, { FC, useEffect, useRef } from 'react';

export interface ITooltipProp {
  title: React.ReactNode | string
  visible: boolean
  align: 'left' | 'center' | 'right'
}
const PREFIX = 'leo-tooltip';
const Tooltip:FC<ITooltipProp> = ({ children, title, visible, align }) => {
  const promptRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (promptRef && promptRef.current) {
      const h = promptRef.current.getBoundingClientRect().height;
      promptRef.current.style.top = -h - 10 +'px';
    }
  }, [visible]);

  return (
    <div className={PREFIX}>
      {
        visible &&
        <div ref={promptRef} className={`${PREFIX}-prompt`}>
          <div className={`${PREFIX}-prompt-body`}>{title}</div>
          <div className={`${PREFIX}-prompt-arrow`}></div>
        </div>
      }
      <div className={`${PREFIX}-content`}>
        {children}
      </div>
    </div>
  );
};
Tooltip.defaultProps={
  visible: false,
};
export default Tooltip;
