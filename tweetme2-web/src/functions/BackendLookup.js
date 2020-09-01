import getCookie from './GetCookies'

function backendLookup(method, endpoint, callback, data) {
  let jsonData;
  if (data){
    jsonData = JSON.stringify(data)
  }
  const xhr = new XMLHttpRequest()
  const url = `http://127.0.0.1:8000/api${endpoint}`
  xhr.responseType = "json"
  xhr.open(method, url)
  const csrftoken = getCookie('csrftoken');
  xhr.setRequestHeader("Content-Type", "application/json")
  if (csrftoken) {
    xhr.setRequestHeader("X-CSRFToken", csrftoken)
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
  }
  xhr.onload = function() {
    if (xhr.status === 403) {
      const detail = xhr.response.detail
      if (detail === "Authentication credentials were not provided.") {
        if (window.location.href.indexOf("login") === -1) {
          window.location.href = "/login" // or "/login?showLoginRequired=true"
        }
      }
    }
    callback(xhr.response, xhr.status)
  }
  xhr.onerror = function() {
    callback({"message": "the request was an error"}, 400)
  }
  xhr.send(jsonData)      
};

export default backendLookup;
