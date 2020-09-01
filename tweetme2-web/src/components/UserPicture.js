import React from 'react'


function UserPicture(props) {

    const {user} = props

    // get the user picture or username[0]

    const handleClick = (event) => {
        // this is similar as handleUserLink in UserLink component
        window.location.href= `/profile/${user.username}`
        event.stopPropagation()
    }

    return (
        <span className='mx-1 px-3 py-2 rounded-circle bg-dark text-white' onClick={handleClick} style={{cursor:'pointer'}}>
            {user.username[0]}
        </span>
    )
}

export default UserPicture;