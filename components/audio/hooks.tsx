import { Beats } from "@database/models/beats";
import { getFileLink, getS3FileLink } from "@lib/utils";
import {useContext, useEffect, useRef, useState} from "react";
import {AudioContext} from "./provider";

export const useAudio = (track: Beats) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [drag, setDrag] = useState(0);
    const [isSeeking, setSeeking] = useState(false);

    const audio = useRef<HTMLAudioElement>(new Audio());

    useEffect(() => {
        audio.current.src = getS3FileLink(track.music.key);

        const setAudioData = () => {
            setDuration(audio.current.duration);
            setCurrentTime(audio.current.currentTime);
        };

        const setAudioTime = () => {
            const curTime = audio.current.currentTime;
            setCurrentTime(curTime);
            const progression = curTime
                ? (curTime * 100) / audio.current.duration
                : 0;
            setProgress(progression);
        };

        const setAudioVolume = () => setVolume(audio.current.volume);
        const setAudioEnd = () => setIsPlaying(true);
        audio.current.addEventListener("loadeddata", setAudioData);
        audio.current.addEventListener("timeupdate", setAudioTime);
        audio.current.addEventListener("volumechange", setAudioVolume);
        audio.current.addEventListener("ended", setAudioEnd);
        audio.current.addEventListener("seeking", () => setSeeking(true));
        audio.current.addEventListener("seeked", () => setSeeking(false));

        return () => {
            audio.current.pause();
        };
    }, []);
    useEffect(() => {
        audio.current.volume = volume;
    }, [volume]);

    useEffect(() => {
        pause();
        audio.current.currentTime = Math.round((drag * duration) / 100);
    }, [drag]);

    useEffect(() => {
        audio.current.src = getS3FileLink(track.music.key);
        play();
    }, [track.music.key]);
    
    useEffect(()=>{
        if("mediaSession" in navigator){
            navigator.mediaSession.metadata = new MediaMetadata({
                title: track.title,
                artist: "Black Soninke",
                artwork:[
                    {src : getFileLink(track.image.key), type: track.image.type}
                ]
            })
            navigator.mediaSession.setActionHandler('play', () => play());
            navigator.mediaSession.setActionHandler('pause', () => pause())
            navigator.mediaSession.setActionHandler('stop', () => {pause(); audio.current.currentTime = 0})
            navigator.mediaSession.setActionHandler("seekbackward", (details) => audio.current.currentTime -= details.seekOffset || 10 )
            navigator.mediaSession.setActionHandler("seekforward", (details) => audio.current.currentTime += details.seekOffset || 10 )    
        }
    },[track._id, track.image.key, track.image.type, track.title])

    const play = () => {
        setIsPlaying(false);
        audio.current.play();
        navigator.mediaSession.playbackState = "playing"
    };

    const pause = () => {
        setIsPlaying(true);
        audio.current.pause();
        navigator.mediaSession.playbackState = "paused"

    };

    const onCurrentTimeChange = (value: number) => {
        setProgress(value);
        setDrag(value);
    };

    const onVolumechange = (value: number) => setVolume(value);

    return {
        currentTime,
        duration,
        progress,
        volume,
        isPlaying,
        onCurrentTimeChange,
        play,
        isSeeking,
        onVolumechange,
        pause,
    };
};

export function useAudioContext() {
    return useContext(AudioContext);
}
