import axios from 'axios';

const DEFAULT_URL = "http://localhost:4000/playlist";

let randomWords = [];

const generateRandomWords = (arr) => {

    if(randomWords.length) {
        randomWords = []; 
    }

    let randomizedArr = [];

    for (var i = 0; i < 5; i++) {
        var idx = Math.floor(Math.random() * arr.length);
        randomizedArr.push(arr[idx]);
        arr.splice(idx, 1);
      }

    return randomizedArr;
} 

export const fetchMusic = async (userValue) => {
    
    try{
        const { data } = await axios.get(`${DEFAULT_URL}?name=${userValue}`);
        
        if(data.error) {
            return {
                error: "End of related lyrics"
            }
        }

        const random = generateRandomWords(data.songLyrics);
        randomWords.push(...random);
        
        return {
            title: data.result.track.track_name,
            name: data.result.track.artist_name,
            lyrics: data.songLyrics.join(" ")
        }
    } catch (error) {
        console.log(error);
    }
 
}

export const fetchMusicByLyrics = async() => {

    try {
        const { data } = await axios.get(`${DEFAULT_URL}/lyrics?random=${randomWords.join(' ')}`);
    
        if(data.error) {
            return {
                error: "End of related lyrics"
            }
        }
    
        const random = generateRandomWords(data.songLyrics);
        randomWords.push(...random);
        
        return {
            title: data.result.track.track_name,
            name: data.result.track.artist_name,
            lyrics: data.songLyrics.join(" ")
        }
    } catch (error) {
        console.log(error);
    }
}