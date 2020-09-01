import backendLookup from './BackendLookup'


function apiProfileDetail(username, callback) {

  backendLookup(
    "GET",
    `/profiles/${username}`,
    callback
  )
}

export default apiProfileDetail;
