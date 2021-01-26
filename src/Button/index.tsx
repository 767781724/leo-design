import React, { FC } from 'react';

export interface IButtonProp {
}

const PREFIX = 'leo-button';

const Button: FC<IButtonProp> = ({ children }) => {
  return (
    <div className={PREFIX}>
      {children}
    </div>
  );
};

export default Button;
