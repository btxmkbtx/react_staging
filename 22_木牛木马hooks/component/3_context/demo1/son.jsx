import React, { useContext } from 'react';
import { CountContext } from './index';

function Son() {
    const config = useContext(CountContext); // 得到每次更新的config
  
    return (
      <h2>
        {config.count} {config.lang}
      </h2>
    );
}

export default Son