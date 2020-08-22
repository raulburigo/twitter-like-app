import backendLookup from './BackendLookup'


function apiTweetDetail(tweetId, callback) {

  backendLookup(
    "GET",
    `/tweets/${tweetId}`,
    callback
  )
}

export default apiTweetDetail;
  