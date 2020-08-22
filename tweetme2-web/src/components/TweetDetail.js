import React, {useState, useEffect} from 'react'
import Tweet from './Tweet'
import apiTweetDetail from '../functions/ApiTweetDetail'

function TweetDetail(props) {
    const {tweetId} = props.data
    const [didLookup, setDidLookup] = useState(false)
    const [tweet, setTweet] = useState(null)
    const handleBackendLookup = (response, status) => {
        if (status === 200) {
            setTweet(response)
        } else {
            alert("The was an error finding your tweet.")
        }
    }

    useEffect(() =>{
        if (didLookup === false) {
            apiTweetDetail(tweetId, handleBackendLookup)
            setDidLookup(true)
        }
    }, [tweetId, didLookup, setDidLookup])

    return ( tweet === null ? null :
        <Tweet tweet={tweet} className={props.className} />
    )
};

export default TweetDetail;