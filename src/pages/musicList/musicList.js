import React,{Component} from 'react';
import MusicItem from '../../components/musicItem/MusicItem'

class MusicList extends Component{
  render() {
    let listEle = null;
    listEle = this.props.musicList.map( (item) => {
      return (
        <MusicItem 
          key={item.id}
          musicItem = {item}
          focus = {item === this.props.currentMusicItem}
        >
          {item.title}
        </MusicItem>
      );
    });
    return (
      <ul>
        {listEle}
      </ul>
    );
  }
}

export default MusicList;