import { AddShoppingCart } from "@mui/icons-material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import  { Gener, Song ,AddSong} from "../Song";
import { current } from '@reduxjs/toolkit'
import {geSongs} from '../api/apiCalles'
import {createSong}from '../api/post';
import { geSongsByArtist } from "../api/getAllByArtist";
import{deleteSong} from "../api/delete";
import { geSongById } from "../api/getById";
import { updateSong } from "../api/put";
export interface SongsState{
    songs:Song[]
}

const initialState:SongsState={
    
songs:[]

 }
 const songsSlice= createSlice({
    initialState,
    name:"songs",
    reducers:{
        receivedSongs(state,action:PayloadAction<Song[]>){
             debugger
             state.songs=action.payload
          
            console.log(state.songs)
         
        },
        addSong(state,action:PayloadAction<Song>){
            debugger
            const song=action.payload;
             state.songs.push(song);
         
            console.log(current(state.songs))
        },
        // ,deleteSong(state,action:PayloadAction<string>){
        //     debugger
        //     const id=action.payload;
        //     state.songs=state.songs.filter((song)=>{
        //         return  song.id!==id
              
        //     })
        //     console.log(current(state.songs))
          
        // },
        editSong(state,action:PayloadAction<Song>){
            debugger
                const songUpdated=action.payload;
                state.songs=state.songs.filter((song)=>{return song.id!==songUpdated.id});
                state.songs.push(songUpdated);
        }
    },
 })


export const  getSongsAction =()=>{
    return  (dispatch: any)=>{
        const fetchData =async ()=>{
           return await  geSongs();
        }
        fetchData().then((data:Song[]|string)=>{
            if(typeof data!=="string"){ console.log(data+"ii")
            dispatch(receivedSongs(data))}
           
            else alert(data)
        })
    }
}

export const  addSongsAction =(song:AddSong)=>{
    return  (dispatch: any)=>{
        const fetchData =async ()=>{
           return await  createSong(song);
        }
        fetchData().then((data:Song|string)=>{
            if(typeof data!=="string"){ console.log(data+"ii");
            dispatch(getSongsAction())
            }
           
            else alert(data)
        })
    }
}

export const getSongsByArtist=(artist:string)=>{
    debugger
    return (dispatch: any)=>{
        const fetchData = async ()=>{
            return await geSongsByArtist(artist)
        }
        fetchData().then((data:Song[]|string)=>{
            if(data===null ||data.length===0){
                alert("no songs found for artist: " + artist)
                dispatch(getSongsAction());
             }
            else if(typeof data!=="string"){ 
                dispatch(receivedSongs(data))
            }
           
            else alert(data)
        })
    
}
}

export const deleteSongAction=(id:string)=>{
    debugger;
    return (dispatch: any)=>{
        const fetchData =async ()=>{return await deleteSong(id)}
        fetchData().then((data:string)=>{
            alert(data);
            dispatch(getSongsAction())
        })
}
}


export const editSongThunk=(song:Song,id:string)=>{
    debugger;
    return (dispatch: any)=>{
        const fetchData =async ()=>{return await updateSong(song,id)}
        fetchData().then((data)=>{
            if(typeof data === 'string'){
          
            dispatch(getSongsAction())
        }
        else   alert(data);
        })
}
}
export type addSongtype= typeof addSong ;
 export const {receivedSongs,addSong,editSong} =songsSlice.actions;
 export default songsSlice.reducer;