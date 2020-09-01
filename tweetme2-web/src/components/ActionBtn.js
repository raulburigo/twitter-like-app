import React from 'react'
import apiTweetAction from '../functions/ApiTweetAction'


function ActionBtn(props) {
    const {tweet, action, didPerformAction, target} = props
    const likes = tweet.likes ? tweet.likes : 0
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'
    const display = action.type === 'like' ? `${likes} ${action.display}` : actionDisplay

    const handleActionBackendEvent = (response, status) => {
        if ((status === 200 || status === 201) && didPerformAction) {
            didPerformAction(response, status)
        }
    }
    
    const handleClick = (event) => {
        event.preventDefault()
        console.log("cliquei no ", target.id)
        apiTweetAction(target.id, action.type, handleActionBackendEvent)
        event.stopPropagation()


    }
    return (
    <button className={className} onClick={handleClick}>
        {display}
    </button>
    )
}

export default ActionBtn;