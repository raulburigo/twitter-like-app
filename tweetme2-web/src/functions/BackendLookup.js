import getCookie from './GetCookies'

function backendLookup(method, endpoint, callback, data) {
  let jsonData;
  if (data){
    jsonData = JSON.stringify(data)
  }
  const xhr = new XMLHttpRequest()
  const url = `http://localhost:8000/api${endpoint}`
  xhr.responseType = "json"
  xhr.open(method, url)
  const csrftoken = getCookie('csrftoken');
  xhr.setRequestHeader("Content-Type", "application/json")
  if (csrftoken) {
    xhr.setRequestHeader("X-CSRFToken", csrftoken)
//    xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
//    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
  }
  xhr.onload = function() {
    callback(xhr.response, xhr.status)
  }
  xhr.onerror = function() {
    console.log(jsonData)
    callback({"message": "the request was an error"}, 400)
  }
  xhr.send(jsonData)      
};

export default backendLookup;
