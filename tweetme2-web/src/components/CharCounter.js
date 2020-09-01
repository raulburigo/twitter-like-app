import React from 'react'

function CharCounter(props) {

    const {chars} = props
    const charLimit = 240
    var charsLeft = charLimit - chars
    var style = {
        "color": "black"
    }
    if (charsLeft < 20 && charsLeft >= 0) {
        style = {
            "color": "red",
        }
    } else if (charsLeft < 0) {
        style = {
            "color": "LightGray",
        }
    }
    
    return (
        <p className='small float-right' style={style}>{charsLeft}</p>
        
        )
}

export default CharCounter;