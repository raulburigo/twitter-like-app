import React, {useState} from 'react'
import ActionBtn from './ActionBtn'
import UserPicture from './UserPicture'
import UserLink from './UserLink'
import TweetTime from './TweetTime'

function Tweet(props) {
  const {tweet, didRetweet} = props
  const tweetToDisplay = tweet.is_retweet ? tweet.original_tweet : tweet
  const [actionTweet, setActionTweet] = useState(tweetToDisplay ? tweetToDisplay : null)
  const path = window.location.pathname
  const match = path.match(/(?<tweetid>\d+)/)
  const urlTweetId = match ? match.groups.tweetid : -1
  const isDetail = `${tweetToDisplay.id}` === `${urlTweetId}`
  
  const handlePerformAction = (newActionTweet, status) => {
    if (status === 200) {
      setActionTweet(newActionTweet)
    } else if (status === 201) {
      if (didRetweet) {
        didRetweet(newActionTweet)
      }
    }
  }

  const handleLink = (event) => {
    event.preventDefault()
    window.location.href = `/${tweetToDisplay.id}`
    event.stopPropagation()
  }
  
  return (

    <div className={isDetail === true ? "container-fluid border my-1" : "container-fluid border my-1 clickabletweet"} 
          onClick={isDetail === true ? null : handleLink}>
      <div className="row">
        <div className="col">
          {tweet.is_retweet ? 
            <p className='small text-muted'><UserLink user={tweet.user} includeFullName={true}/> Retweeted</p> :
            <p className='small text-muted'></p>
          }
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className='d-flex'>
            <div className=''>
              <UserPicture user={tweetToDisplay.user}/>
            </div>
            <div className='col-11'>
              <div>
                <p>
                  <UserLink user={tweetToDisplay.user} includeFullName={true}/>
                  <TweetTime tweet={tweetToDisplay}/>
                </p>
                <p style={{"wordWrap":"break-word"}}>{tweetToDisplay.content}</p>
              </div>
              <div className='btn btn-group px-0'>          
                <React.Fragment>
                  <ActionBtn tweet={actionTweet} target={tweetToDisplay} didPerformAction={handlePerformAction} action={{type: "like", display:"Likes"}}/>
                  <ActionBtn tweet={actionTweet} target={tweetToDisplay} didPerformAction={handlePerformAction} action={{type: "unlike", display:"Unlike"}}/>
                  <ActionBtn tweet={actionTweet} target={tweetToDisplay} didPerformAction={handlePerformAction} action={{type: "retweet", display:"Retweet"}}/>
                </React.Fragment>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tweet;
