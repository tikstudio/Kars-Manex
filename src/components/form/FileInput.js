import React, { Component } from 'react';
import _ from 'lodash';
import "../../assets/CSS/components/fileInput.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import Avatars from "../utils/Avatar";

class FileInput extends Component {
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
    const {files} = this.state;
    const {...props} = this.props;
    return (
      <label className="fileInput">
        <ul>
          { files.map((file, key) => (
            <li key={ key }>
              <Avatars src={ file.preview }
                       style={ {
                         width: '70px',
                         height: '70px',
                         boxShadow: '1px 1px 3px black',
                       } }
                       alt={ file.name }
                       onError={ ev => {
                         ev.target.src = "/images/icons/loginIcon.png"
                       } }
              />
              <p title={ file.name }>{ _.truncate(file.name, {
                'length': 10,
                'separator': ''
              }) }</p>
            </li>
          )) }
        </ul>
        { _.isEmpty(files) ?
          <div className="emptyFile__content">
            <FontAwesomeIcon icon={ faFileImage }/>
            <span>Վերբեռնել լուսանկար</span>
          </div> : null }
        <input { ...props } type="file" onChange={ this.handleChange }/>
      </label>
    );
  }
}

export default FileInput;
