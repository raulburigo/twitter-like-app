import React, {useEffect, useState} from 'react';
import Tweet from './Tweet';
import apiTweetsList from '../functions/ApiTweetsList'


function TweetsList(props) {

  const [tweetsInit, setTweetsInit] = useState([])
  const [tweets, setTweets] = useState([])
  const [tweetsDidSet, setTweetsDidSet] = useState(false)

  useEffect(() => {
    let final = [...props.newTweets].concat(tweetsInit)
    if (final.length !== tweets.length) {
      setTweets(final)
    }
  }, [props.newTweets, tweets, tweetsInit])

  useEffect(() => {
    if (tweetsDidSet === false) {
      const handleTweetListLookup = (response, status) => {
        if (status === 200) {
          setTweetsInit(response)
          setTweetsDidSet(true)
        } else {
          alert("there was an error here!")
        }
      }
      apiTweetsList(props.username, handleTweetListLookup)
    }
  }, [tweetsInit, tweetsDidSet, setTweetsDidSet, props.username])

  const handleDidRetweet = (newTweet) => {
    const updateTweetsInit = [...tweetsInit]
    updateTweetsInit.unshift(newTweet)
    setTweetsInit(updateTweetsInit)
    const updateFinalTweets = [...tweets]
    updateFinalTweets.unshift(newTweet)
    setTweets(updateFinalTweets)  
  }

  return (
    <div>
        {tweets.map((item, index) => {
        return <Tweet
            tweet={item}
            didRetweet={handleDidRetweet}
            className='my-5 py-5 border bg-white text-dark'
            idName={item.id}
            key={`${index}-{item.id}`}
        />
        })}
    </div>
  );
}

export default TweetsList;
