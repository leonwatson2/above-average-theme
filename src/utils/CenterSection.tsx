import React, { FC } from 'react';
export const CenteredSection: FC = ({ children }) => (
  <section
    style={{
      height: '100vh',
      display: 'grid',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
  </section>
);
