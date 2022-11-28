import React from 'react';

import { SidebarListContainer, CollapsedItemContainer } from './container';
import Item from './item';
import LinkWithChildren from './link-with-children';
import SidebarLinks from '../../iterators/sidebar';

interface Props {
  activeLink: string;
  collapsed: boolean;
}

export default class SidebarList extends React.Component<Props> {
  render() {
    const { activeLink, collapsed } = this.props;
    return (
      <SidebarListContainer collapsed={collapsed}>
        {SidebarLinks.map((item) => {
          const isActive = activeLink === item.link;
          if (!collapsed) {
            return item.hasChildren && item.children ? <LinkWithChildren key={item.key} item={item} isActive={isActive} /> : <Item key={item.key} item={item} isActive={isActive} />;
          } else {
            return (
              <CollapsedItemContainer key={item.key}>
                <img src={`/images/icons/sidebar/white-mode/${isActive ? 'active' : 'deactive'}/${item.icon}.svg`} alt="icon" />
              </CollapsedItemContainer>
            );
          }
        })}
      </SidebarListContainer>
    );
  }
}
