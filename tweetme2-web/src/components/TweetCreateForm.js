import React, {useState} from 'react'
import apiTweetCreate from '../functions/ApiTweetCreate'
import CharCounter from './CharCounter'

function TweetCreateForm(props) {

    const textAreaRef = React.createRef()
    const {didTweet} = props
    const handleBackendUpdate = (response, status) => {
        // backend api response handler
        if (status === 201) {
            didTweet(response)
        } else if (status === 403 && response.detail === "Authentication credentials were not provided.") {
            alert("You must log in first.")
        } else {
            alert("An error ocurred, please try again")
        }
    }

    const handleSubmit = (event) => {
        // backend api request
        event.preventDefault()
        const newVal = textAreaRef.current.value
        apiTweetCreate(newVal, handleBackendUpdate)
        textAreaRef.current.value = ''
        setNewTweetLen(textAreaRef.current.value.length)
    }

    const [newTweetLen, setNewTweetLen] = useState(0)

    const teste = (event) => {
        event.preventDefault()
        setNewTweetLen(textAreaRef.current.value.length)
    }

    return (
        <div className={props.className}>
            <form onSubmit={handleSubmit}>
                <textarea ref={textAreaRef} onChange={teste} required={true} className='form-control' name="tweet"></textarea>
                <div>
                    <button type='submit' className='btn btn-primary my-3'>Tweet</button>
                    <CharCounter chars={newTweetLen}/>
                </div>
            </form>
        </div>
    )
}

export default TweetCreateForm;