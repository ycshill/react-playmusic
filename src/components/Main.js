import React, { Component } from 'react';
import $ from 'jquery';
import Header from '../components/header/Header';
import Player from '../pages/player/player';
import { MUSIC_LIST } from '../data/musiclist';
import MusicList from '../pages/musicList/musicList';
import {Router, Route} from 'react-router-dom';
import createHistory from 'history/createHashHistory';

const history = createHistory();

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST[0],
    }
  }

  componentDidMount() {
    $('#player').jPlayer({
      ready: function() {
        $(this).jPlayer('setMedia', {
          mp3: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
        }).jPlayer('play');
      },
      supplied: 'mp3',
      vmode: 'window'
    });
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