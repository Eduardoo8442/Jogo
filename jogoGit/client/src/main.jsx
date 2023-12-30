import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './components/Main/index.jsx';
import Servers from './components/Servers/index.jsx';
import { Provider } from 'react-redux';
import store from './store/store';
import CreateServer from './components/CreateServer/index.jsx';
import Lobby from './components/Lobby/index.jsx';
import Party from './components/Party/index.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}> 
  <BrowserRouter>
    <App />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/servers" element={<Servers />} />
      <Route path="/create" element={<CreateServer />} />
      <Route path="/lobby" element={<Lobby />} />
      <Route path="/party" element={<Party />} />
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
    </BrowserRouter>
    </Provider>
)
