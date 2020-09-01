import React from 'react'


function UserLink(props) {
    
    const {user, includeFullName} = props
    const nameDisplay = includeFullName ? `${user.first_name} ${user.last_name} - ` : null

    const handleUserLink = (event) => {
        // this is similar as handleClick in UserPicture component
        window.location.href= `/profile/${user.username}`
        event.stopPropagation()
    }

    return (
        <React.Fragment>
            {nameDisplay}
            <span onClick={handleUserLink} style={{cursor:'pointer'}}>@{user.username}</span>
        </React.Fragment>
    )
}

export default UserLink;
