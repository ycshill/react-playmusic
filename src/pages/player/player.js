import React, { Component } from 'react';
import $ from 'jquery';
import 'jplayer';
import './player.css';

import Progress from '../../components/progress/Progress';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: '-', // 音乐播放进度
      duration: 0, // 返回音频的长度
    }
  }

  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute,
        duration: e.jPlayer.status.duration,
      })
    })
  }

  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  }
  progressChangeHandler = (progressHand) => {
    $("#player").jPlayer('play', this.state.duration * progressHand);
  }

  render() {
    return (
      <div className="player-page">
            <h1 className="caption"></h1>
            <div className="mt20 row">
                <div className="controll-wrapper">
                    <h2 className="music-title">歌曲名称</h2>
                    <h3 className="music-artist mt10">歌手</h3>
                    <div className="row mt20">
                        <div className="left-time -col-auto">-2:00</div>
                        <div className="volume-container">
                            <i className="icon-volume rt" style={{top:5,left:-5}}></i>
                            <div className="volume-wrapper">
                                <Progress/>
                            </div>
                        </div>
                    </div>
                    <div style={{height:10,lineHeight:'10px',marginTop:'10px'}}>
                        <Progress />
                    </div>
                    <div className="mt35 row">
                        <div>
                            <i className="icon prev" ></i>
                            <i className="icon ml20" ></i>
                            <i className="icon next ml20"></i>
                        </div>
                        <div className="-col-auto">
                            <i className="icon repeat-cycle"></i>
                        </div>
                    </div>
                </div>
                <div className="-col-auto cover">
                    <img />
                </div>
            </div>
        </div>
    );
  }
}

export default Player;