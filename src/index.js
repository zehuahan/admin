import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'

// 如果 local 中保存了 user, 将 user 保存到内存中
const user = storageUtils.getUser()
if (user && user._id) {
  memoryUtils.user = user
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
