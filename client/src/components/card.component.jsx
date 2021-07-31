import React from 'react';

import './card.styles.css';

const CardComponent = ({songs}) => {
    
    return(
        songs.map( (song) =>
            !song.error
            ? (
                <div key={song.title} className='card-div'>
                    <p> Title: {song.title} </p>
                    <p> Artist Name: {song.name} </p>
                    <p> Lyrics: {song.lyrics} </p>
                </div>
            )
            : <div className='card-div'> 
                <p> {song.error} </p> 
            </div>
        )
    )
}

export default CardComponent