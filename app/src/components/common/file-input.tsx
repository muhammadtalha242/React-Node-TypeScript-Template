import React, { useState } from 'react';
import styled from 'styled-components';

import { FilledButton } from './button';

import { NAVY_PRIMARY, WHITE } from '../../styles/colors';
import { couldStartTrivia } from 'typescript';

interface Props {
  label: string;
  onUpload: Function;
  currentFile?: string;
  width?: string;
  backgroundColor?: string;
  textColor?: string;
}

const FileInputContainer = styled.div`
  .file-input {
    position: relative;
    overflow: hidden;
    display: inline-block;
  }

  .file-input input[type='file'] {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
  }
`;

const FileInput: React.FC<Props> = (props) => {
  const [currentFile, setFile] = useState({ file: null });

  const onChange = (e: any) => {
    const files = e.target.files;
    setFile({ file: files[0] });
    if (props.onUpload) props.onUpload(files[0]);
  };

  return (
    <FileInputContainer>
      <div className="file-input">
        <FilledButton width={props.width} background={props.backgroundColor || NAVY_PRIMARY} color={props.textColor || WHITE}>
          {props.label}
        </FilledButton>
        <input type="file" onChange={onChange} />
      </div>
    </FileInputContainer>
  );
};

export default FileInput;
