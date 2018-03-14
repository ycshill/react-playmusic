import React, { Component } from 'react';
import $ from 'jquery';
import 'jplayer';
import './player.css';
import {Link} from 'react-router-dom';
import Pubsub from 'pubsub-js';

import Progress from '../../components/progress/Progress';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0, // 音乐播放进度
      duration: 0, // 返回音频的长度
      volume: 0, //声音
      barColor: '#2f9842',
      isPlay: true,
    }
  }

  formatTime(time) {
      time = Math.floor(time);
      let min = Math.floor(time/60);
      let seconds = Math.floor(time%60);

      seconds = seconds < 0 ? `0${seconds}` : seconds;

      return `${min}:${seconds}`;
  }
  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      this.setState({
        volume: e.jPlayer.options.volume * 100,
        progress: e.jPlayer.status.currentPercentAbsolute,
        duration: e.jPlayer.status.duration,
        leftTime: this.formatTime(e.jPlayer.status.duration * (1 - e.jPlayer.status.currentPercentAbsolute/100)),
      })
    })
  }

  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  }
  progressChangeHandler = (progressHand) => {
    $("#player").jPlayer('play', this.state.duration * progressHand);
  }
  changeVolumeHandler(progress) {
      $('#player').jPlayer('volume', progress);
  }
  play() {
    let player=$('#player');
    if(this.state.isPlay){
        player.jPlayer('pause');
    }else {
        player.jPlayer('play');
    }
    this.setState({
        isPlay:!this.state.isPlay
    });
  }

  playPrev() {
    Pubsub.publish('PLAY_PREV');
  }
  playNext() {
    Pubsub.publish('PLAY_NEXT');
  }

  render() {
    return (
      <div className="player-page">
            <h1 className="caption"><Link to="/list">音乐收藏夹 &gt;</Link></h1>
            <div className="mt20 row">
                <div className="controll-wrapper">
                    <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                    <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                    <div className="row mt20">
                        <div className="left-time -col-auto">-{this.state.leftTime}</div>
                        <div className="volume-container">
                            <i className="icon-volume rt" style={{top:5,left:-5}}></i>
                            <div className="volume-wrapper">
                                <Progress 
                                   progress={this.state.volume}
                                   onProgressChange={this.changeVolumeHandler.bind(this)}
                                   barColor="#aaa"
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{height:10,lineHeight:'10px',marginTop:'10px'}}>
                        <Progress
                          progress={this.state.progress}
                          onProgressChange={this.progressChangeHandler.bind(this)}
                          barColor={this.state.barColor} 
                         />
                    </div>
                    <div className="mt35 row">
                        <div>
                            <i className="icon prev" onClick={this.playPrev}></i>
                            <i 
                              className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`}
                              onClick={this.play.bind(this)}                              
                            ></i>
                            <i className="icon next ml20" onClick={this.playNext}></i>
                        </div>
                        <div className="-col-auto">
                            <i className="icon repeat-cycle"></i>
                        </div>
                    </div>
                </div>
                <div className="-col-auto cover">
                    <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                </div>
            </div>
        </div>
    );
  }
}

export default Player;