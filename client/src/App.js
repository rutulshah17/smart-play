import React from 'react';

import { fetchMusic, fetchMusicByLyrics } from './api/musix.api';

import CardComponent from './components/card.component';

class App extends React.Component {


    constructor() {
        super();

        this.state = {
            userValue: '',
            songs: []
        }
    }

    sleep = (timeInSeconds) => {
        return new Promise(resolve => setTimeout(resolve, timeInSeconds));
    }

    componentDidUpdate = async() => {
       
        if(this.state.songs.length) {
            const fetchedMusicByLyrics = await fetchMusicByLyrics();
            console.log(fetchedMusicByLyrics);
            await this.sleep(10000);
            
            this.setState({ songs: [ ...this.state.songs, fetchedMusicByLyrics] });
        }
    }

    handleChange = (event) => {
        this.setState({userValue: event.target.value});
    }
    
    getMusic = async (event) => {
        event.preventDefault();
        const fetchedMusic = await fetchMusic(this.state.userValue);
        this.setState({ songs: [fetchedMusic] });
    }


    render() {
        console.log(this.state);
        return (
            <>
                <form onSubmit={this.getMusic} >
                    <input type='text' placeholder='find lyrics' onChange={this.handleChange}/>
                    <button type='submit'> Generate </button>
                    <h1> Welcome to Smart Playlist </h1>
                </form>

                <CardComponent songs={this.state.songs}/>
                    
            </>

        )
    }
};

export default App;