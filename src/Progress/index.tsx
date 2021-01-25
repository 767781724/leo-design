import React, { FC } from 'react';

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
   * @description 进度条高度
   * @default 4px
   */
  height?: string | number
}

const PREFIX = 'leo-progress';

const Progress: FC<IProgressProp> = ({
  percent, height, color,
}: IProgressProp) => {
  return (
    <div style={{ height: height }} className={`${PREFIX}-line`}>
      <div
        className={`${PREFIX}-line-main`}
        style={{
          width: `${percent}%`,
          backgroundColor: color }}></div>
    </div>
  );
};

export default Progress;
