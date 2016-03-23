import React, {Component, PropTypes} from 'react'
import Dialog from 'material-ui/lib/dialog'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'
import './NewProjectDialog.scss'

export default class NewProjectDialog extends Component {
  constructor (props) {
    super(props)
  }

  state = { open: false }

  static propTypes = {
    open: PropTypes.bool,
    onSubmit: PropTypes.func
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.open) {
      this.state.open = nextProps.open
      setTimeout(() => {
        if(this.refs.modalTextField) this.refs.modalTextField.focus()
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log('recieved propps', nextProps)
    if (nextProps !== this.state) this.setState(nextProps)
  }

  open = () => {
    this.setState({
      open: true
    })
  }

  close = () => {
    this.setState({
      open: false
    })
  }

  handleInputChange = (e) => {
    e.preventDefault()
    this.setState({
      name: e.target.value
    })
  }

  handleSubmit = e => {
    console.log('handle submit called:')
    // e.preventDefault()
    // if (!this.name || !this.nameIsValid) return this.setState({ errorText: 'name is invalid'})
    this.close()
    if(this.props && this.props.onSubmit){
      console.log('submit is set')
      this.props.onSubmit(this.state.name)
    }
  }

  getErrorText = () => {
    if (this.state.errorText) return this.state.errorText
    if (!this.name || this.name === '' || this.name === null) return 'Name is required'
    if(!this.nameIsValid) return 'Name is too short'
    return 'Name is too short'
  }

  nameIsValid = () => {
    // TODO: DO other validation
    return this.state.name.length >= 3
  }

  render () {
    const actions = [
      <FlatButton
        label='Close'
        secondary={ true }
        onTouchTap={ this.close }
      />,
      <FlatButton
        label='Create'
        primary={ true }
        onClick={ this.handleSubmit } />
    ]
    return (
      <Dialog
        className='NewProjectDialog'
        title='New Project'
        actions={ actions }
        modal={ false }
        open={ this.state.open }
        onRequestClose={ this.close }>
        <div className='NewProjectDialog-Inputs'>
          <TextField
            hintText='exampleProject'
            floatingLabelText='Project Name'
            ref='modalTextField'
            onChange={ this.handleInputChange }
            onEnterKeyDown={ this.handleSubmit }
          />
        </div>
      </Dialog>
    )
  }
}
