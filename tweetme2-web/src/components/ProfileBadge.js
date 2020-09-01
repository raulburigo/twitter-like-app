import React, {useState, useEffect} from 'react'
import apiProfileDetail from '../functions/ApiProfileDetail'
import apiFollowAction from '../functions/ApiFollowAction'
import numeral from 'numeral'

function ProfileBadge(props) {

    const {username} = props.data
    const [didLookup, setDidLookup] = useState(false)
    const [profile, setProfile] = useState(null)
    const handleBackendLookup = (response, status) => {
        if (status === 200) {
            setProfile(response)
        }
    }

    useEffect(() =>{
        if (didLookup === false) {
            apiProfileDetail(username, handleBackendLookup)
            setDidLookup(true)
        }
    }, [username, didLookup, setDidLookup])

    const handleFollowBtn = (event) => {
        event.preventDefault()
        if (profile.is_self) {
            window.location.href = "/profile/edit"
        } else {
            if (profile.is_following === true) {
                apiFollowAction(profile.username, "unfollow", handleBackendLookup)
            } else {
                apiFollowAction(profile.username, "follow", handleBackendLookup)
            }
        }
    }

    return (
        didLookup === false ? "loading..." : profile ?
        <div className="my-4 mx-4">
            <p>
                <span className='mx-2 px-3 py-2 rounded-circle bg-dark text-white'>{profile.username[0]}</span>
                <span>{profile.first_name} {profile.last_name} - @{profile.username}</span>
            </p>
            <p>{profile.location}</p>
            <p>Followers: {numeral(profile.followers).format("0a")} | Following: {numeral(profile.following).format("0a")}</p>
            {profile.is_self === true ? <button onClick={handleFollowBtn} className='btn btn-outline-primary mb-3'>Edit profile</button> :
            profile.is_following === true ?
            <button onClick={handleFollowBtn} className='btn btn-primary mb-3' id='unfollowBtn'><span>Following</span></button> :
            <button onClick={handleFollowBtn} className='btn btn-outline-primary mb-3'>Follow</button>
            }
            <p>{profile.bio}</p>
        </div>
        : null
    )
}

export default ProfileBadge;