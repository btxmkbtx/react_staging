import React, { createContext, useState } from 'react';
import Father from './father';

export const CountContext = createContext({
  count: 0,
  lang: 'zh',
});
function Grandfather() {
  const [config, setconfig] = useState({
    count: 0,
    lang: 'zh',
  });
  return (
    <div>
      <CountContext.Provider value={config}>
        <Father />
      </CountContext.Provider>

      <button onClick={() => setconfig({ ...config, count: config.count + 2 })}>change count</button>
      <button onClick={() => setconfig({ ...config, lang: config.lang === 'zh' ? 'en' : 'zh' })}>
        change language
      </button>
    </div>
  );
}

export default Grandfather;