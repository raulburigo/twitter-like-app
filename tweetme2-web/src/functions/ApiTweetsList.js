import backendLookup from './BackendLookup'


function apiTweetsList(username, callback, nextUrl) {
  let endpoint = "/tweets/"
  if (username) {
    endpoint = `/tweets/?username=${username}`
  }
  if (nextUrl !== null && nextUrl !== undefined) {
    endpoint = nextUrl.replace("http://127.0.0.1:8000/api", "")
  }

  backendLookup(
    "GET",
    endpoint,
    callback
  )
}

export default apiTweetsList;
  