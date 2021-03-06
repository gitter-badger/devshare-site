import React, {Component, PropTypes} from 'react';
import Popover from 'material-ui/lib/popover/popover';
import TextField from 'material-ui/lib/text-field';
import './WorkspacePopover.scss';
class WorkspacePopover extends Component {

  constructor(props){
    super(props);
  }

  static propTypes = {
    workspaceElement: PropTypes.object,
    initialPath: PropTypes.string,
    type: PropTypes.oneOf(['file', 'folder']),
    onSubmit: PropTypes.func,
    onClose: PropTypes.func
  };

  state = {
    activePopover: 'none',
    path: ''
  };

  componentWillReceiveProps(props) {
    if (props.type && props.open) {
      this.show('pop');
    }
  }

  show = (key, e) => {
    this.setState({
      activePopover:key
    }, () => {
      setTimeout(() => {
        this.refs.popoverTextField.focus();
      }, 500);
    });
  };

  closePopover = (key) => {
    if (this.state.activePopover !== key)
      return
    this.setState({
      activePopover:'none',
    }, () => {
      this.refs.popoverTextField.blur();
    });
    this.props.onClose();
  };

  onSubmit = () => {
    this.props.onSubmit(this.props.type, this.state.path);
    this.closePopover('pop');
  };

  handleChange = (e) => {
    this.setState({path: e.target.value});
  };

  handleFocus = (e) => {
    e.target.value = e.target.value;
  };

  render(){
    return (
      <Popover className="WorkspacePopover" open={this.state.activePopover === 'pop'}
        anchorEl={this.props.workspaceElement}
        anchorOrigin={{horizontal:"middle",vertical:"top"}}
        targetOrigin={{horizontal:"middle",vertical:"top"}}
        onRequestClose={this.closePopover.bind(this, 'pop')} >
        <div style={{padding:20}}>
          <p>Enter path for new { this.props.type }</p>
          <TextField
            hintText={this.props.initialPath}
            defaultValue={this.props.initialPath}
            onChange={this.handleChange}
            ref="popoverTextField"
            onFocus={ this.handleFocus }
            onEnterKeyDown={ this.onSubmit }
          />
        </div>
      </Popover>
    );
  }
}

export default WorkspacePopover
