import "./PageContent.css"
import { musics } from "../../musics/"
import { useState, useRef } from "react";
import PlayIcon from "../../assets/play.svg";
import StopIcon from "../../assets/stop.svg";
import NextIcon from "../../assets/next.svg";
import PreviusIcon from "../../assets/previous.svg";
import PauseIcon from "../../assets/pause.svg";
import replayIcon from "../../assets/replay.png"
import acitveReplayIcon from "../../assets/replay-ativo.png"

export default function PageContent() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [icon, setIcon] = useState(PlayIcon);
    const [iconReplay, setIconReplay] = useState(replayIcon)
    const [currentMusic, setCurrentMusic] = useState(musics[0]);
    const [currentTime, setCurrentTime] = useState(0);
    const [musicDuration, setMusicDuration] = useState(0);
    const [liveDuration, setLiveDuration] = useState(0);
    const [replay, setReplay] = useState(false);
    const [currentId, setCurrentId] = useState(1)


    const $musicPlayer = useRef(null);

    function playMusic() {
        const audioPlayer = $musicPlayer.current;

        if (isPlaying) {
            audioPlayer.pause();
            setIcon(PlayIcon)
            setIsPlaying(false)
        } else {
            audioPlayer.play();
            setIcon(PauseIcon)
            setIsPlaying(true)
        }
    }

    function replayMusic() {

        if (replay) {
            setIconReplay(replayIcon)
            setReplay(false)
        } else {
            setIconReplay(acitveReplayIcon)
            setReplay(true)
        }
    }


    function clickCard(id) {
        const musicFind = musics.find(music => music.id === id)
        const audioPlayer = $musicPlayer.current;

        if (currentId !== id) {
            setCurrentMusic(musicFind);
            setIsPlaying(true);
            audioPlayer.play();
            setIcon(PauseIcon);
            setCurrentId(id)
        }
    }

    function previousMusic(currentMusic) {
        const id = currentMusic.id
        const lastId = musics.length

        if (id === 1) {
            return clickCard(lastId)
        }

        clickCard(id - 1)
    }

    function nextMusic(currentMusic) {
        const id = currentMusic.id
        const lastId = musics.length

        if (id === lastId) {
            return clickCard(1)
        }

        clickCard(id + 1)
    }

    function stopMusic() {
        const audioPlayer = $musicPlayer.current;

        audioPlayer.currentTime = 0;
        audioPlayer.pause()
        setIcon(PlayIcon);
        setIsPlaying(false);
        attTime(0)
    }

    function attTime(currentPercentage) {
        const audioPlayer = $musicPlayer.current;

        if (currentPercentage === 100 && !replay) {
            nextMusic(currentMusic)
        } else if (currentPercentage === 100 && replay) {
            $musicPlayer.current.currentTime = 0;
            audioPlayer.play();
        }

        setMusicDuration($musicPlayer.current.duration);
        setLiveDuration($musicPlayer.current.currentTime);

        return setCurrentTime(currentPercentage)
    }

    function handleTimeMusic(e) {
        const currentPercentageValue = e.target.value;

        attTime(currentPercentageValue)
        $musicPlayer.current.currentTime = $musicPlayer.current.duration / 100 * currentPercentageValue;
    }

    function formatTime(s) {
        const secondsCalc = s.toFixed()
        const minute = Math.floor(secondsCalc / 60);
        const seconds = secondsCalc % 60;

        return `${minute.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <div className="mainContent">

            <h1 className="title">The best of Pink Floyd</h1>
            <div className="pageContent">
                {musics.map(({ id, cover, title, description }) => (
                    <div onClick={() => clickCard(id)} className="cards" key={id}>
                        <img src={cover} alt="music cover" />
                        <h2>{title}</h2>
                        <h3>{description}</h3>
                    </div>
                ))}
            </div>

            <div className="footer">
                <div className="titleMusic">
                    <h2>{musics[currentId - 1].title}</h2>
                    <h3>{musics[currentId - 1].artist}</h3>
                </div>
                <img
                    className="coverMusicPlayer"
                    src={musics[currentId - 1].cover}
                    alt="cover musica"
                />
            </div>

            <div className="playerContainer">
                <div className="buttons">
                    <img onClick={() => stopMusic()} src={StopIcon} alt="Stop Icon" />
                    <img onClick={() => previousMusic(currentMusic)} src={PreviusIcon} alt="Previous Icon" />
                    <img onClick={playMusic} src={icon} alt="Play/Pause Icon" />
                    <img onClick={() => nextMusic(currentMusic)} src={NextIcon} alt="Next Icon" />
                    <img onClick={replayMusic} src={iconReplay} alt="" />
                </div>
                <div className="timeMusic">
                    <p>{formatTime(liveDuration)}</p>
                    <input
                        className="timeBar"
                        type="range"
                        min="0"
                        max="100"
                        value={currentTime}
                        onChange={handleTimeMusic}
                    />
                    <p>{formatTime(musicDuration)}</p>
                </div>
                <div className="time-line">
                    <audio autoPlay="autoplay" ref={$musicPlayer} src={currentMusic.url}
                        onTimeUpdate={() => {
                            const currentPercentage = ($musicPlayer.current.currentTime / $musicPlayer.current.duration) * 100;
                            if (currentPercentage) { attTime(currentPercentage) }
                        }}></audio>
                </div>
            </div>

        </div >
    )
}
