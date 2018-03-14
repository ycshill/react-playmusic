import React,{Component} from 'react';
import './MusicItem.css';
import Pubsub from 'pubsub-js';

class MusicItem extends Component {
  playMusic(musicItem) {
    Pubsub.publish('PLAY_MUSIC', musicItem);
  }
  deleteMusic(musicItem, e) {
    e.stopPropagation();
    Pubsub.publish('DELETE_MUSIC', musicItem);
  }

  render () {
    const musicItem = this.props.musicItem;
    return (
      <li 
        className={`components-musiclistitem row ${this.props.focus ?'focus':''}`}
        onClick = {this.playMusic.bind(this, musicItem)}
      >
        <p>
          <strong>{musicItem.title}</strong>-
          {musicItem.artist}
        </p>
        <p 
          className="-col-auto delete"
          onClick={this.deleteMusic.bind(this, musicItem)}
        ></p>
      </li>
    );
  }
}

export default MusicItem;