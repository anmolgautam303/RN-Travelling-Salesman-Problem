import React from 'react';
import App from './src';
import { Provider } from 'react-redux';

import { store } from './src/store';

const RNRedux = () => (
    <Provider store={store}>
      <App />
    </Provider>
);

export default RNRedux;
