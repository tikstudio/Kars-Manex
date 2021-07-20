import React, { Component } from 'react';
import _ from 'lodash';
import "../../assets/CSS/components/fileInput.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from "@fortawesome/free-solid-svg-icons";

class FileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    }
  }

  handleChange = (ev) => {
    const files = [...ev.target.files];
    _.forEach(files, (file) => {
      file.preview = URL.createObjectURL(file);
    })
    this.setState({files})
    this.props.onChange(ev, files);
    ev.target.value = '';
  }

  render() {
    const {className, title, ...props} = this.props;
    return (
      <label className={ className } title={ title }>
        <div className="emptyFile__content">
          <FontAwesomeIcon style={ {color: '#3d3d3d', fontSize: '24px'} } icon={ faCamera }/>
        </div>
        <input { ...props } type="file" onChange={ this.handleChange }/>
      </label>
    );
  }

}

export default FileEdit;
