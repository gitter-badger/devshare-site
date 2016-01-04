import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import Editor from '../Editor';
import './View.scss';

class View extends Component {
  constructor(props){
    super(props);
  }
  static propTypes = {
    viewData: PropTypes.object,
    visible: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    onLoad: PropTypes.func
  };
  render(){
    let style = this.props.visible ? { display: 'block' } : { display: 'none' };
    let name = `ace-editor-${this.props.index}`;
    // TODO: Switch view type based on provided type instead of availability of editor data
    if(this.props.viewData && this.props.viewData.file){
      let file = this.props.viewData.file;
      console.warn('file in view:', file);
      return (
        <div className="View" style={ style }>
          <Editor
            name={ name }
            value={ file.content }
            mode={ file.fileType || 'javascript' }
            onLoad={ this.props.onLoad }
            fbRef={ file.fbRef }
          />
        </div>
      );
    } else {
      return (
        <div className="View-Default">
          <span className="View-Default-Label">Click on a file name to open</span>
        </div>
      );
    }

  }
}

export default View;