import React, {useState} from 'react'
import TweetsList from './TweetsList'
import TweetCreateForm from './TweetCreateForm'

function TweetsMainApp(props) {

    const [newTweets, setNewTweets] = useState([])
    const canTweet = props.data.canTweet === "false" ? false : true

    const handleNewTweet = (newTweet) => {
        console.log(newTweet)
        let tempNewTweets = [...newTweets]
        tempNewTweets.unshift(newTweet)
        setNewTweets(tempNewTweets)
    }

    return (
        <div className={props.className}>
            {canTweet === true && <TweetCreateForm className='col-12 mb-3' didTweet={handleNewTweet}/>}
            <TweetsList newTweets={newTweets} username={props.data.username}/>
        </div>
    )
}

export default TweetsMainApp;