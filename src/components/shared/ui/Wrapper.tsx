import { FC } from 'react';

type Props = {
  children: React.ReactNode;
};

export const Wrapper: FC<Props> = ({ children }) => {
  return <div className='wrapper '>{children}</div>;
};
