import React,{Component} from 'react';
import logo from '../../images/logo.png';
import './Header.css';

class Header extends Component {
  render() {
    return(
      <div className="header-container row">
        <img src={logo} width="40" className="-col-auto" alt="图标"/>
        <h1 className="header-title ">React Music palyer</h1>
      </div>
    );
  };
}

export default Header;