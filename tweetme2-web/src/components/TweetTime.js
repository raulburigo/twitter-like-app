import React from 'react'

function TweetTime(props) {

  const {tweet} = props
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const tweetDate = Date.parse(tweet.timestamp)
  const deltaTime = (Date.now() - tweetDate)/1000
  var timeObj = new Date(tweetDate)
  let timeDisplay = ""
  if (deltaTime < 2) {
    timeDisplay = "now"
  } else if (deltaTime < 60) {
    timeDisplay = parseInt(deltaTime).toString() + "s"
  } else if (deltaTime < 3600) {
    timeDisplay = parseInt(deltaTime / 60).toString() + "min"
  } else if (deltaTime < 86400) {
    timeDisplay = parseInt(deltaTime / 3600).toString() + "h"
  } else {
    timeDisplay = months[timeObj.getMonth()] + " " + timeObj.getDate()
  }

  return (
    <span className='small text-muted'> * {timeDisplay}</span>
  )

}

export default TweetTime;