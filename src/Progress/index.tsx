import React, { FC } from 'react';
import './style/index.scss';

export interface IProgressProp {
  percent?: number
  color?: string,
  height?: number | string
}

const PREFIX = 'progress';

const Progress: FC<IProgressProp> = ({
  percent, height, color = '#1890ff',
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
