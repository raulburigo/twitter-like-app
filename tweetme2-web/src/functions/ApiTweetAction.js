import backendLookup from './BackendLookup'


function apiTweetAction(tweetId, action, callback) {
  const data = {
    id: tweetId,
  //  content: newTweet,
    action: action,
  }
  backendLookup(
    "POST",
    "/tweets/action/",
    callback,
    data
  )
}
  
export default apiTweetAction;
