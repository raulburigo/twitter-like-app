import backendLookup from './BackendLookup'


function apiFollowAction(profile, action, callback) {
  const data = {
    action: `${action ? action : ''}`,
  }
  backendLookup(
    "POST",
    `/profiles/${profile}/follow`,
    callback,
    data
  )
}
  
export default apiFollowAction;
