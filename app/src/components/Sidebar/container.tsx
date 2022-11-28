import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { GREEN_PRIMARY, GREY_QUATERNARY, NAVY_PRIMARY, WHITE } from '../../styles/colors';

import { sidebar } from '../../styles/constants';

interface ISidebarListContainerProps {
  collapsed: boolean;
}

interface ISidebarContainerProps {
  collapsed: boolean;
}

interface ISidebarHeaderContainerProps {
  collapsed: boolean;
}

export const SidebarContainer = styled.div<ISidebarContainerProps>`
  position: fixed;
  left: 0;
  top: 0;
  min-height: 100vh;
  width: ${(props) => (props.collapsed ? sidebar.collapsed.width : sidebar.width)}px;
  // border: 4px solid ${GREEN_PRIMARY};
  border-radius: 0 16px 16px 0;
  box-sizing: border-box;
  background: ${WHITE};
`;

export const SidebarHeaderContainer = styled.div<ISidebarHeaderContainerProps>`
  margin: 24px 16px 32px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SidebarListContainer = styled.div<ISidebarListContainerProps>`
  height: calc(100vh - 96px);
  overflow-y: auto;

  ${(props) =>
    props.collapsed
      ? ``
      : `
    .item {
      font-size: 14px;
      line-height: 21px;
      color: ${NAVY_PRIMARY};
      padding: 12px 16px;
      display: flex;
      align-items: center;
  
      &:hover {
        background: ${GREY_QUATERNARY};
        border-radius: 8px;
      }
  
      &.disabled {
        pointer-events: none;
      }
  
      img:not(.small) {
        width: 16px;
        height: 16px;
      }
  
      &:not(.has-children) {
        margin-right: 12px;
        margin-left: 12px;
        &.active {
          color: ${GREEN_PRIMARY};
          font-weight: 600;
        }
      }
  
      &.has-children {
        margin: 0;
        justify-content: space-between;
      }
  
      .label {
        margin-left: 20px;
      }
    }
    `}
`;

export const LinkWithChildrenContainer = styled.div`
  margin: 0 12px;
  &.is-expanded {
    background: ${GREY_QUATERNARY};
  }
`;

export const ChildItemContainer = styled(Link)`
  display: flex;
  align-items: center;
  margin: 0 12px;
  font-size: 14px;
  color: ${NAVY_PRIMARY};
  padding: 8px;
  line-height: 24px;

  &.disabled {
    pointer-events: none;
  }

  &:hover {
    background: ${WHITE};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    color: ${NAVY_PRIMARY};
  }

  &.active {
    background: ${WHITE};
    border-radius: 4px;
    color: ${GREEN_PRIMARY};
  }

  img:not(.small) {
    width: 16px;
    height: 16px;
  }

  .label {
    margin-left: 8px;
  }
`;

export const CollapsedItemContainer = styled.div`
  padding: 16px 28px;
  display: flex;
  align-items: center;

  img {
    width: 16px;
    height: 16px;
  }

  &:first-child {
    padding-top: 12px;
  }
`;
