import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TweetsMainApp from './components/TweetsMainApp'
import TweetDetail from './components/TweetDetail'
import * as serviceWorker from './serviceWorker';
import FeedMainApp from './components/FeedMainApp';
import ProfileBadge from './components/ProfileBadge'

const tweetme2El = document.getElementById('tweetme2app')
if (tweetme2El) {
  ReactDOM.render(
    <React.StrictMode>
      <TweetsMainApp data={tweetme2El.dataset}/>
    </React.StrictMode>,
    tweetme2El
  );
};

const feedEl = document.getElementById('tweetme-feed')
if (feedEl) {
  ReactDOM.render(
    <React.StrictMode>
      <FeedMainApp data={feedEl.dataset}/>
    </React.StrictMode>,
    feedEl
  );
};

const tweetDetailElements = document.querySelectorAll(".tweetme-2-detail")
if (tweetDetailElements) {
  tweetDetailElements.forEach(container=> {
    ReactDOM.render(
      <React.StrictMode>
        <TweetDetail data={container.dataset}/>
      </React.StrictMode>,
      container
    )
  })
}

const profileDetailElements = document.getElementById('tweetme-2-profile')
if (profileDetailElements) {
  ReactDOM.render(
    <React.StrictMode>
      <ProfileBadge data={profileDetailElements.dataset}/>
    </React.StrictMode>,
    profileDetailElements
  );
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
