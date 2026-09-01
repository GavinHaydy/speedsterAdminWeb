import React from 'react';

import { useAppSelector } from '@/store/hooks.ts';
import { selectCurrentUser } from '@/store/slices/userSlice.ts';

export const HeaderComponent: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);
  return (
    <>
      <div
        style={{
          position: 'absolute',
          right: 0,
          color: '#fff',
        }}
      >
        {user?.nickname}
      </div>
    </>
  );
};
