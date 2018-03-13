import React,{Component} from 'react';
import './Progress.css';

class Progress extends Component {
  static defaultProps = {
    barColor: '#2f9842',
  };
  changeProgress = (e) => {
    let progressBar = this.refs.progressBar;
    let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
    this.props.onProgressChange && this.props.onProgressChange(progress); //调用父亲的方法
  }
  render() {
    return(
      <div 
        className="Progress-container row"
        onClick={this.changeProgress}
        ref="progressBar"
      >
        <div className="progress" style={{width: `${this.props.progress}%`, background: this.props.barColor }}></div>
        
      </div>
    );
  };
}

export default Progress;