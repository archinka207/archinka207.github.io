import React, { useEffect, useState } from 'react';
import './content.css';

function Content(props) {
    return (
        <div className='contante'>
            <p className='text'>
                <span className='correct'>{props.handledWordMash}</span>
                <span className='unprocessed' id='vertline'>{props.wordMash}</span>
            </p>
        </div>
    );
}

export default Content;