import React, { FC } from 'react';
import classNames from 'classnames';

export interface IProgressProp {
  /**
   * @description 进度百分比
   * @default  0-100
   */
  percent?: number
  /**
   * @description 进度条颜色
   * @default 主题色
   */
  color?: string,
  /**
   * @description 背景色
   */
  backgroundColor?: string
  /**
   * @description 进度条高度
   * @default 4px
   */
  height?: string | number
  /**
   * @description 圆角
   */
  radius?: string | number
  /**
   * @description 类名
   */
  className?: string
}

const PREFIX = 'leo-progress';

const Progress: FC<IProgressProp> = ({
  percent, height, color, backgroundColor, radius, className,
}: IProgressProp) => {
  return (
    <div style={{ height: height, backgroundColor, borderRadius: radius }}
      className={classNames([`${PREFIX}-line`, className])}>
      <div
        className={`${PREFIX}-line-main`}
        style={{ width: `${percent}%`, backgroundColor: color, borderRadius: radius }}></div>
    </div>
  );
};

Progress.defaultProps={
  backgroundColor: '#fff',
};

export default Progress;
