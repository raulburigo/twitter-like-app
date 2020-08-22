import backendLookup from './BackendLookup'


function apiTweetsList(username, callback) {
  let endpoint = "/tweets/"
  if (username) {
    endpoint = `/tweets/?username=${username}`
  }

  backendLookup(
    "GET",
    endpoint,
    callback
  )
}

export default apiTweetsList;
  