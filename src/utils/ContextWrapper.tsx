import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const ContextWrapper: FC = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default ContextWrapper;
