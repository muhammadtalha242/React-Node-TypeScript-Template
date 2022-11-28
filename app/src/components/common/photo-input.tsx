import React, { useState } from 'react';
import styled from 'styled-components';

import { OutlinedButton, FilledButton } from './button';

import { NAVY_PRIMARY, RED_PRIMARY, WHITE } from '../../styles/colors';

interface Props {
  label: string;
  onUpload: Function;
  image?: string;
}

const PhotoInputContainer = styled.div`
  .label {
    font-weight: 500;
    font-size: 13px;
    line-height: 19px;
    letter-spacing: 0.05em;
    margin-bottom: 8px;
  }
  .field {
    display: flex;
    align-items: center;

    input {
      display: none;
    }

    img {
      width: 160px;
      height: 160px;
      margin-right: 16px;
      border-radius: 50%;
    }

    button {
      margin-right: 16px;
    }
  }
`;

const PhotoInput: React.FC<Props> = (props) => {
  const [image, setImage] = useState({ url: '', file: null });

  const onChange = (e: any) => {
    const files = e.target.files;
    setImage({ url: URL.createObjectURL(files[0]), file: files[0] });
  };

  return (
    <PhotoInputContainer>
      <div className="label">{props.label}</div>
      <div className="field">
        <input type="file" id="photo-input" onChange={onChange} />
        <label htmlFor="photo-input">
          <img src={props.image || `/images/icons/profile03.png`} alt="" />
        </label>
        <FilledButton onClick={() => props.onUpload(image.file)} background={NAVY_PRIMARY} color={WHITE}>
          Upload
        </FilledButton>
        {/* <OutlinedButton color={RED_PRIMARY}>Remove</OutlinedButton> */}
      </div>
    </PhotoInputContainer>
  );
};

export default PhotoInput;
