import React,{Component} from 'react';
import './MusicItem.css';

class MusicItem extends Component {
  render () {
    const musicItem = this.props.musicItem;
    return (
      <li className={`components-musiclistitem row ${this.props.focus ?'focus':''}`}>
        <p>
          <strong>{musicItem.title}</strong>-
          {musicItem.artist}
        </p>
        <p className="-col-auto delete"></p>
      </li>
    );
  }
}

export default MusicItem;