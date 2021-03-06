import { isArray, isUndefined, find, isString } from 'lodash';
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import TreeView from '../TreeView';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import AddIcon from 'material-ui/lib/svg-icons/content/add-circle';
import SettingsIcon from 'material-ui/lib/svg-icons/action/settings';
import GroupIcon from 'material-ui/lib/svg-icons/social/group';
import './SideBar.scss';

export default class SideBar extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    projects: PropTypes.array,
    project: PropTypes.object.isRequired,
    files: PropTypes.array,
    onFileClick: PropTypes.func,
    onPublishClick: PropTypes.func,
    showButtons: PropTypes.bool,
    onLogoutClick: PropTypes.func,
    onAddFileClick: PropTypes.func,
    onAddFolderClick: PropTypes.func,
    loadFiles: PropTypes.func,
    onFilesDrop: PropTypes.func,
    onSharingClick: PropTypes.func,
    onFilesAdd: PropTypes.func,
    onRightClick: PropTypes.func,
    filesLoading: PropTypes.bool
  };

  state = {
    filesOver: false
  };

  componentDidMount() {
    this.refs.fileInput.setAttribute('webkitdirectory', '')
  }

  selectProject = (e, i, name) => {
    if (this.props && this.props.onProjectSelect) {
      let proj = find(this.props.projects, { name })
      this.props.onProjectSelect(proj, i)
    }
  };

  handleFileUploadClick = (e) => {
    this.refs.fileInput.click()
  };

  handleFileUpload = (e) => {
    this.props.onFilesAdd(e)
  };

  handleFileDrag = (e) => {
    e.preventDefault()
    this.setState({
      filesOver: true
    })
  };

  handleFileDrop = (e) => {
    this.props.onFilesDrop(e)
    this.setState({ filesOver: false })
  };

  handleFileDragLeave = (e) => {
    this.setState({ filesOver: false })
  };

  handleRightClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.onRightClick(null, { x: e.clientX, y: e.clientY })
  };

  render () {
    const showProjects = !isUndefined(this.props.showProjects) ? this.props.showProjects : true;
    const iconButtonStyle = { width: '60px', height: '60px' }
    const iconStyle = { width: '100%', height: '100%' }
    let projectsMenu
    if (isArray(this.props.projects) && this.props.projects.length > 0) {
      projectsMenu = this.props.projects.map((project, i) => {
        return <MenuItem key={`Project-${i}`} label={ project.name } value={ project.name } primaryText={ project.name }/>
      })
    }
    return (
      <div className={ this.state.filesOver ? "SideBar SideBar--FileHover" : "SideBar"}
        onDragOver={ this.handleFileDrag }
        onDragLeave={ this.handleFileDragLeave }
        onDrop={ this.handleFileDrop }
        onContextMenu={ this.handleRightClick }
      >
        <div className="SideBar-Dropzone">
        { (projectsMenu && showProjects) ?
          <SelectField
            style={{width: '80%', marginLeft: '10%'}}
            labelStyle={{fontSize: '1.5rem', fontWeight: '300', textOverflow: 'ellipsis'}}
            autoWidth={ false }
            value={ this.props.project.name }
            children={ projectsMenu }
            onChange={ this.selectProject }
          /> : null
          }
          <TreeView
            account={ this.props.account }
            fileStructure={ this.props.files }
            onFileClick={ this.props.onFileClick }
            onRightClick={ this.props.onRightClick }
            projectName={ this.props.project.name }
            loading={ this.props.filesLoading }
          />
          <input type="file" ref="fileInput" style={{display: 'none'}} onChange={ this.handleFileUpload } multiple />
          <div className="SideBar-Buttons">
            <IconMenu
              className="SideBar-Button"
              iconButtonElement={
                <IconButton
                  style={ iconButtonStyle }
                  iconStyle={ iconStyle } >
                  <AddIcon />
                </IconButton>
            }>
              <MenuItem primaryText="Upload files" onClick={ this.handleFileUploadClick } />
              <MenuItem primaryText="Download files" onClick={ this.props.onDownloadFileClick } />
              <MenuItem primaryText="Add file" onClick={ this.props.onAddFileClick.bind(this, '/') } />
              <MenuItem primaryText="Add folder" onClick={ this.props.onAddFolderClick.bind(this, '/') } />
              {/*<MenuItem primaryText="Add files from Github" />*/}
            </IconMenu>
            <IconButton
              style={ iconButtonStyle }
              iconStyle={ iconStyle }
              className="SideBar-Button"
              onClick={ this.props.onSharingClick } >
              <GroupIcon />
            </IconButton>
            <IconButton
              style={ iconButtonStyle }
              iconStyle={ iconStyle }
              className="SideBar-Button"
              onClick={ this.props.onSettingsClick } >
              <SettingsIcon />
            </IconButton>
          </div>
        </div>
      </div>
    )
  }
}
