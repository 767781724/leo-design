import React, { FC, ReactNode } from 'react';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import classNames from 'classnames';

export interface ISpinProp {
  /**
   * @description 是否显示加载动画
   * @default flase
   */
  spinning?: boolean
  /**
   * @description 描述文案
   */
  tip?: string
  /**
   * @description 是否以卡片形式展示
   * @default false
   */
  isCard?: boolean
  /**
   * @description 自定义指示符
   */
  indicator?: ReactNode
}

const PREFIX = 'leo-spin';

const Spin: FC<ISpinProp> = ({ spinning, children, tip, isCard, indicator }) => {
  const iconView = () => {
    const defaultIcon = <span> <LoadingOutlined /> </span>;
    return (
      <div className={`${PREFIX}-icon`}>
        <div className={classNames(`${PREFIX}-icon-main`, { [`${PREFIX}-icon-card`]: isCard })}>
          {indicator ? indicator : defaultIcon}
          {tip && <p>{tip}</p>}
        </div>
      </div>
    );
  };

  return (
    <div className={classNames(PREFIX, { [`${PREFIX}-scroll`]: spinning })}>
      {spinning && iconView()}
      <div className={`${PREFIX}-content`}>
        {children}
      </div>
    </div>
  );
};

Spin.defaultProps = {
  spinning: true,
  isCard: false,
};

export default Spin;
