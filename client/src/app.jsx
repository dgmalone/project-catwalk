// Dependency imports
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// Component Imports
import { Overview } from './OverviewComponents/View.jsx';
import { Related } from './RelatedComponents/View.jsx';
import QandA from './QandAComponents/QandA.jsx';
import RandR from './ReviewsComponents/RandR.jsx';
import RandRAPIcalls from './ReviewsComponents/RandRAPIcalls.js';
// Context and Custom Hook Imports
import { AppContext, useApp } from './AppComponents/index.js';
import { OverviewContext, useOverview } from './OverviewComponents/index.js';
import { RelatedContext, useRelated } from './RelatedComponents/index.js';

function App() {

  // Parent Hooks
  const appState = useApp();

  // Dereks Hooks

  // Lukas Hooks
  const [productId, setProduct] = useState(0);
  const [productName, setProductName] = useState('');
  useEffect(() => {
    RandRAPIcalls.getProducts()
      .then(response => {
        console.log(response);
        setProduct(response.data[2].id);
        setProductName(response.data[2].name);
      })
      .catch(err => console.log('err', err));
  }, []);

  // Wills Hooks
  const overviewState = useOverview();

  // Related Hooks
  const relatedState = useRelated();

  return (
    <AppContext.Provider value={appState}>
      <OverviewContext.Provider value={overviewState}>
        <Overview />
        <Related />
      </OverviewContext.Provider>
      <QandA productId={productId} productName={productName}/>
      <RandR productId={productId} productName={productName}/>
    </AppContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
