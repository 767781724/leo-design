import React from 'react';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';

export interface ILoadingIconProp {
  loading?:boolean
  prefix:string
}
const LoadingIcon = ({ loading, prefix }:ILoadingIconProp) => {
  if (!!loading===false) return null;
  return (
    <span className={`${prefix}-loading-icon`}>
      <LoadingOutlined/>
    </span>
  );
};

export default LoadingIcon;
