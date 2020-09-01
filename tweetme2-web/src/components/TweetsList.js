import React, {useEffect, useState} from 'react';
import Tweet from './Tweet';
import apiTweetsList from '../functions/ApiTweetsList'

function TweetsList(props) {

  const [tweetsInit, setTweetsInit] = useState([])
  const [tweets, setTweets] = useState([])
  const [nextUrl, setNextUrl] = useState(null)
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
          setTweetsInit(response.results)
          setNextUrl(response.next)
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

  const handleLoadNext = (event) => {
    event.preventDefault()
    if (nextUrl !== null) {
      const handleLoadNextResponse = (response, status) => {
        if (status === 200) {
          setNextUrl(response.next)
          const newTweets = [...tweets].concat(response.results)
          setTweetsInit(newTweets)
          setTweets(newTweets)
        } else {
          alert("there was an error here!")
        }
      }
      apiTweetsList(props.username, handleLoadNextResponse, nextUrl)
    }
  }

  return (
    <React.Fragment>
        {tweets.map((item, index) => {
        return <Tweet
            tweet={item}
            didRetweet={handleDidRetweet}
            className='my-5 py-3 px-2 border bg-white text-dark'
            key={`${index}-{item.id}`}
        />
        })}
      { nextUrl !== null && <button className="btn btn-outline-primary" onClick={handleLoadNext}>Show More</button>}
    </React.Fragment>
  );
}

export default TweetsList;
