import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'redux-grout'
import { hydrateUser } from '../../actions/account'
import Navbar from '../../components/Navbar/Navbar'
import Grout from 'kyper-grout'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import Theme from '../../theme'
import './App.scss'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

class Main extends Component {
  constructor (props) {
    super(props)
    this.getChildContext = () => {
      return {
        muiTheme: ThemeManager.getMuiTheme(Theme),
      }
    }
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentDidMount () {
    let grout = new Grout()
    if(grout.currentUser){
      this.props.hydrateUser(grout.currentUser)
    }
  }

  handleClick = (loc) => {
    this.context.router.push(`/${loc}`);
  }

  handleLogout = () => {
    this.props.logout();
    this.context.router.push(`/`);
  }

  render () {
    return (
      <div className="App">
        <Navbar
          account={ this.props.account }
          onMenuClick={ this.handleClick }
          onLogoutClick={ this.handleLogout }
        />
        { this.props.children }
      </div>
    )
  }
}
// Place state of redux store into props of component
function mapStateToProps (state) {
  return {
    account: state.account,
    router: state.router
  }
}

// Place action methods into props
function mapDispatchToProps (dispatch) {
  Actions.account.hydrateUser = hydrateUser
  return bindActionCreators(Actions.account, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
