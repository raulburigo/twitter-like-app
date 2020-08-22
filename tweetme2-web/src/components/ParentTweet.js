import React from 'react'
import Tweet from './Tweet'

function ParentTweet(props) {

    const {tweet} = props

    return (
    tweet.original_tweet ?
    <div>
        <div className='row'>
            <div className={'col-11 mx-auto p-3 border rounded'}>
                <p className='mb-0 text-muted small'>Retweets</p>
                <Tweet className={''} tweet={tweet.original_tweet} isParent/>
            </div>
        </div>
    </div>
    : null
    )
}

export default ParentTweet;