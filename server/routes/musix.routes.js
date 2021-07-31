import express from 'express';
import axios from 'axios';
const router = express.Router();


const DEFAULT_URL = "https://api.musixmatch.com/ws/1.1/track.search?format=json&callback=callback&quorum_factor=1"
const API_KEY = "12832752fc79e94b205e24b1a5bf7a4d";


const LYRICS_URL = "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?callback=callback&format=json"


const validateLyrics = (lyrics) => {
    //remove special charcs
    let filterLyrics = lyrics.replace(/[^\w\s]/gi, "");
    
    //remove line breaks
    filterLyrics = filterLyrics.replace(/\n/g, " ");
    
    //converting to array
    filterLyrics = filterLyrics.split(" ");

    //removing array footer which comes with musixmatch
    filterLyrics.splice(-9, 9);
    
    //removing empty array items
    filterLyrics = filterLyrics.filter( item => item )
    
    return filterLyrics;

}

const getLyrics = async (trackName) => {
    
    const { data: { message } } = await axios.get(`${LYRICS_URL}&q_track=${trackName}&apikey=${API_KEY}`);
    
    if(message.body.lyrics) {
        const lyrics = message.body.lyrics.lyrics_body;
        const validatedLyrics = validateLyrics(lyrics);
        return validatedLyrics;
    }

    return false;

}

router.get('/', async (req, res) => {
    console.log(req.query.name);
    const { data: { message } } = await axios.get(`${DEFAULT_URL}&q_lyrics=${req.query.name}&apikey=${API_KEY}`);
    
    if(message.body.track_list.length) {
        const track_name = message.body.track_list[0].track.track_name;
   
        const songLyrics = await getLyrics(track_name);

        if (songLyrics) {
            res.json({result: message.body.track_list[0], songLyrics});
        } else {
            res.json({error: "no more related lyrics found"})
        }

    } else {
        res.json({error: "no more related lyrics found"})
    }
});



router.get('/lyrics', async (req, res) => {
    console.log(req.query.random);
    const { data: { message } } = await axios.get(`${DEFAULT_URL}&q_lyrics=${req.query.random}&apikey=${API_KEY}`);

    if(message.body.track_list.length) {
        const track_name = message.body.track_list[0].track.track_name;
   
        const songLyrics = await getLyrics(track_name);

        if (songLyrics) {
            res.json({result: message.body.track_list[0], songLyrics});
        } else {
            res.json({error: "no more related lyrics found"})
        }

    } else {
        res.json({error: "no more related lyrics found"})
    }


});

export default router;