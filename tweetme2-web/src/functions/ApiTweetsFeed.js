import backendLookup from './BackendLookup'


function apiTweetsFeed(callback, nextUrl) {
  let endpoint = "/tweets/feed"
  if (nextUrl !== null && nextUrl !== undefined) {
    endpoint = nextUrl.replace("http://127.0.0.1:8000/api", "")
  }

  backendLookup(
    "GET",
    endpoint,
    callback
  )
}

export default apiTweetsFeed;
  