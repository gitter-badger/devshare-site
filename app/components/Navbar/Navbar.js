import React, { Component, PropTypes } from 'react';
import './Navbar.scss';
import { Actions } from 'redux-grout';
import { Link } from 'react-router';
//Components
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import Avatar from 'material-ui/lib/avatar';
const stockPhotoUrl = 'https://s3.amazonaws.com/kyper-cdn/img/User.png';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
  }

  static propTypes = {
    account: PropTypes.object,
    onMenuClick: PropTypes.func,
    onLogoutClick: PropTypes.func
  };

  selectItem(e, item) {
    if(item === 'logout' && this.props.onLogoutClick){
      return this.props.onLogoutClick();
    }
    if(this.props.onMenuClick) {
      this.props.onMenuClick(item);
    }
  }
  
  render() {
    const brandLinkLoc = (this.props.account && this.props.account.username) ? `/${this.props.account.username}` : '/';
    const iconButton = (
        <Avatar
          className="Navbar-Avatar"
          src={ this.props.account.avatar_url ? this.props.account.avatar_url : stockPhotoUrl }
          size={ 50 }
        />
      );
    let mainMenu = (
      <div className="Navbar-Main-Menu">
        <FlatButton label="Sign Up" onClick={ this.selectItem.bind(this, null, 'signup') } />
        <FlatButton label="Login" onClick={ this.selectItem.bind(this, null, 'login') } />
      </div>
    );
    let rightMenu = this.props.account.username ? (
      <IconMenu
        iconButtonElement={ iconButton }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        onChange={ this.selectItem }
      >
        <MenuItem primaryText="Account" value="account" />
        <MenuItem primaryText="About" value="about"/>
        <MenuItem primaryText="Sign out" value="logout"/>
      </IconMenu>
    ) : mainMenu;
    return (
      <AppBar
        title={<Link className="Navbar-Brand" to={ brandLinkLoc }>devShare</Link>}
        className="Navbar"
        showMenuIconButton={ false }
        iconElementRight={rightMenu}
      />
    )
  }
}
