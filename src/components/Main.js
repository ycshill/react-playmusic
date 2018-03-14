import React, { Component } from 'react';
import $ from 'jquery';
import Header from '../components/header/Header';
import Player from '../pages/player/player';
import { MUSIC_LIST } from '../data/musiclist';
import MusicList from '../pages/musicList/musicList';
import {Router, Route} from 'react-router-dom';
import createHistory from 'history/createHashHistory';
import Pubsub from 'pubsub-js';
import MusicItem from '../components/musicItem/MusicItem';

const history = createHistory();

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST[0],
    }
  }
  
  playMusic(musicItem) {
    $('#player').jPlayer('setMedia',{
      mp3: musicItem.file
    }).jPlayer('play');
    this.setState({
      currentMusicItem:musicItem
    });
  }

  playNext(type) {
    let index = this.findMusicIndex(this.state.currentMusicItem);
    let newIndex = 0;
    let musicLen = this.state.musicList.length;
    if (type === 'next') {
      newIndex = (index + 1) % musicLen;
    } else {
      newIndex = (index - 1 + musicLen) % musicLen;
    }
    this.playMusic(this.state.musicList[newIndex]);
  }

  findMusicIndex(musicItem) {
    return this.state.musicList.indexOf(musicItem);
  }

  componentDidMount() {
    $('#player').jPlayer({
      supplied: 'mp3',
      vmode: 'window'
    });
    this.playMusic(this.state.currentMusicItem);
    $('#player').bind($.jPlayer.event.ended, (e) => {
      this.playNext('next');
    });
    Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
      this.playMusic(musicItem);
    });
    Pubsub.subscribe('PLAY_PREV', (msg, musicItem) => {
      this.playNext('prev');
    });
    Pubsub.subscribe('PLAY_NEXT', (msg, musicItem) => {
      this.playNext('next');
    });
    Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
      // 这种数据驱动的删除方式值得学习
      this.setState({
        musicList: this.state.musicList.filter( item => {
          return item !== musicItem;
        })
      })
    });   
  }

  componentWillUnmount() {
    Pubsub.subscribe('PLAY_MUSIC');
    Pubsub.subscribe('DELETE_MUSIC');
    Pubsub.subscribe('PLAY_NEXT');
    Pubsub.subscribe('PLAY_PREV');
    $('#player').bind($.jPlayer.event.ended);
  }
  render() {
    const Home = () =>{
      return (
        <Player
          currentMusicItem = {this.state.currentMusicItem}
        />
      );
    };

    const List = () => {
      return (
        <MusicList
          currentMusicItem = {this.state.currentMusicItem}
          musicList = {this.state.musicList}
        />
      );
    };

    return (
     <Router history={history}>
       <div>
         <Header />
         <audio id="player"></audio>
         <Route exact path="/" component={Home} />
         <Route path="/list" component={List} /> 
       </div> 
     </Router>
    );
  }
}

export default Main;