import React, { FC } from 'react';

export interface IButtonProp {
  children?: React.ReactNode
}

const PREFIX = 'leo-button';

const Button: FC<IButtonProp> = ({ children }: IButtonProp) => {
  return (
    <div className={PREFIX}>
      {children}
    </div>
  );
};

export default Button;
