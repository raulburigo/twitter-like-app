import React, {useState} from 'react'
import ActionBtn from './ActionBtn'
import ParentTweet from './ParentTweet'


function Tweet(props) {
  const {tweet, didRetweet} = props
  const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
  const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
  const isParent = props.isParent ? props.isParent : false
  const path = window.location.pathname
  const match = path.match(/(?<tweetid>\d+)/)
  const urlTweetId = match ? match.groups.tweetid : -1
  const isDetail = `${tweet.id}` === `${urlTweetId}`

  const handlePerformAction = (newActionTweet, status) => {
    console.log(actionTweet)
    console.log(newActionTweet)
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
    window.location.href = `/${tweet.id}`
  }

  return (
    <div className={className}>
      <div>
      <p>{tweet.id} - {tweet.content}</p>
      <ParentTweet tweet={tweet}/>
      </div>
      <div className='btn btn-group'>
      {(actionTweet && isParent === false) &&
        <React.Fragment>
        <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type: "like", display:"Likes"}}/>
        <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type: "unlike", display:"Unlike"}}/>
        <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type: "retweet", display:"Retweet"}}/>
        </React.Fragment>}
        {isDetail === true ? null : <button className='btn btn-outline-primary btn-sm' onClick={handleLink}>Detail</button>}
      </div>
    </div>
  )
}

export default Tweet;
