import styled from 'styled-components';

import { RED_PRIMARY, WHITE, NAVY_PRIMARY } from '../../styles/colors';

interface OutlinedButtonProps {
  color: string;
  textColor?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  fontWeight?: string;
  borderWidth?: string;
}

interface FilledButtonProps {
  background: string;
  color: string;
  width?: string;
  height?: string;
  font?: string;
}

interface IconButtonProps {
  text: string;
  icon: string;
  height?: string;
  textColor?: string;
  font?: string;
  width?: string;
}

interface IconButtonContainterProps {
  textColor: string | undefined;
  font?: string | undefined;
  width?: string | undefined;
}

export const OutlinedButton = styled.button<OutlinedButtonProps>`
  border: ${(props) => props.borderWidth || '1px'} solid ${(props) => props.color};
  box-sizing: border-box;
  border-radius: 8px;
  font-weight: ${(props) => props.fontWeight || '500'};
  font-size: ${(props) => props.fontSize || '18px'};
  color: ${(props) => props.color};
  height: ${(props) => props.height || '48px'};
  width: ${(props) => props.width || '120px;'};
  background: ${WHITE};
  cursor: pointer;
`;

export const FilledButton = styled.button<FilledButtonProps>`
  border: none;
  background: ${(props) => props.background};
  border-radius: 8px;
  font-weight: 600;
  font-size: ${(props) => props.font || '18px'};
  color: ${(props) => props.color};
  width: ${(props) => props.width || '118px'};
  height: ${(props) => props.height || '48px'};
  cursor: pointer;
`;

const IconButtonContainer = styled.button<IconButtonContainterProps>`
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 0.05em;
  width: ${(props) => props.width || '64px'};
  font-size: ${(props) => props.font || '14px'};
  color: ${(props) => props.textColor || NAVY_PRIMARY};

  .icon {
    position: absolute;
  }
`;

export const IconButton: React.FC<IconButtonProps> = (props) => {
  return (
    <>
      {props.icon && <img src={props.icon} className="icon" alt="input-icon" />}
      <IconButtonContainer width={props.width} font={props.font} textColor={props.textColor}>
        {props.text}
      </IconButtonContainer>
    </>
  );
};
