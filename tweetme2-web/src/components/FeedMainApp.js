import React, {useState} from 'react'
import TweetsFeed from './TweetsFeed'
import TweetCreateForm from './TweetCreateForm'

function FeedMainApp(props) {

    const [newTweets, setNewTweets] = useState([])
    const canTweet = props.data.canTweet === "false" ? false : true

    const handleNewTweet = (newTweet) => {
        let tempNewTweets = [...newTweets]
        tempNewTweets.unshift(newTweet)
        setNewTweets(tempNewTweets)
    }
 
    return (
        <div className={props.className}>
            {canTweet === true && <TweetCreateForm className='col-12 mb-3' didTweet={handleNewTweet}/>}
            <TweetsFeed newTweets={newTweets}/>
        </div>
    )
}

export default FeedMainApp;