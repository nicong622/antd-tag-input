import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TagInput from './component/tag-input';

ReactDOM.render(
  <React.StrictMode>
    <div className='app'>
      <TagInput />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
