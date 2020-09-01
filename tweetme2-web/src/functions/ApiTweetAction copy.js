import backendLookup from './BackendLookup'


function apiTweetDelete(tweetId, callback) {


  backendLookup(
    "DELETE",
    `/tweets/${tweetId}/delete/`,
    callback
  )
}
  
export default apiTweetDelete;
