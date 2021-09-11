import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  // React.StrictMode是启用react的严格模式，来检查模块中存在的不合理代码
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// 这个js内的实现是用来记录页面性能的
reportWebVitals();
