import React, {Component, PropTypes} from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import './GithubDialog.scss';

export default class GithubDialog extends Component {
  constructor(props){
    super(props);
  }

  static propTypes = {
    project: PropTypes.object.isRequired,
    modalOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
    onSave: PropTypes.func,
  };

  state = {
    urlText: ''
  };

  handleUrlChange = (e) => {
    this.setState({
      urlText: e.target.value
    })
  };

  cancelClick = () => {
    this.setState({
      urlText: null
    });
    this.props.toggleModal();
  };

  saveSettings = () => {
    if(this.props.onSave){
      this.props.onSave(this.state.urlText);
      this.props.toggleModal();
    }
  };

  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={ true }
        onTouchTap={ this.cancelClick }
      />,
      <FlatButton
        label="Clone"
        primary={true}
        keyboardFocused={true}
        onTouchTap={ this.saveSettings }
      />
    ];
    return (
      <Dialog
        title="Clone Repository"
        className="GithubDialog"
        actions={ actions }
        modal={false}
        open={ this.props.modalOpen }
        onRequestClose={ this.props.toggleModal }
        bodyClassName="GithubDialog-Content"
        titleClassName="GithubDialog-Content-Title"
        contentStyle={{'width': '30%'}}
      >
        <TextField
          floatingLabelText="Github url"
          onChange={ this.handleUrlChange }
        />
      </Dialog>
    );
  }
}
