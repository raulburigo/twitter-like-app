import backendLookup from './BackendLookup'


function apiTweetCreate(newTweet, callback) {
  backendLookup(
    "POST",
    "/tweets/create/",
    callback,
    {content: newTweet}
  )
}
  
export default apiTweetCreate;
