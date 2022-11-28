import styled from 'styled-components';

interface VerticalSeperatorProps {
  height: string;
}

interface HorizontalSeperatorProps {
  width: string;
}

export const VerticalSeperator = styled.div<VerticalSeperatorProps>`
  height: ${(props) => props.height};
`;

export const HorizontalSeperator = styled.div<HorizontalSeperatorProps>`
  width: ${(props) => props.width};
`;
