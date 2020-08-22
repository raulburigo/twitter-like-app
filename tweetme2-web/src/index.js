import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TweetsMainApp from './components/TweetsMainApp'
import TweetDetail from './components/TweetDetail';
import * as serviceWorker from './serviceWorker';

const tweetme2El = document.getElementById('tweetme2app')
if (tweetme2El) {
  ReactDOM.render(
    <React.StrictMode>
      <TweetsMainApp data={tweetme2El.dataset}/>
    </React.StrictMode>,
    tweetme2El
  );
};

const tweetDetailElements = document.querySelectorAll(".tweetme-2-detail")
tweetDetailElements.forEach(container=> {
  ReactDOM.render(
    <React.StrictMode>
      <TweetDetail data={container.dataset}/>
    </React.StrictMode>,
    container
  )
})



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
