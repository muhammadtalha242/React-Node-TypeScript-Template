import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { LinkWithChildrenContainer } from './container';
import ChildItem from './child-item';
import { ISidebarLink } from '../../iterators/sidebar';

interface Props {
  item: ISidebarLink;
  isActive: boolean;
}

const LinkWithChildren: React.FC<Props> = (props) => {
  const location = useLocation();
  const { item } = props;
  const currentPath = location.pathname;
  const [isChildExpanded, setIsChildExpanded] = useState(currentPath.indexOf(item.link) >= 0);
  return (
    <LinkWithChildrenContainer className={classNames({ 'is-expanded': isChildExpanded })}>
      <div onClick={() => setIsChildExpanded(!isChildExpanded)} className={classNames({ item: true, 'has-children': true })}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={`/images/icons/sidebar/white-mode/deactive/${item.icon}.svg`} alt="item" />
          <span className="label">{item.label}</span>
        </div>
        <img className="small" src={`/images/icons/sidebar/white-mode/${isChildExpanded ? 'arrow-up' : 'arrow-down'}.svg`} alt="arrow-down" />
      </div>
      {isChildExpanded && (
        <React.Fragment>
          {item.children.map((item) => {
            const isActive = currentPath === item.link;
            return <ChildItem key={item.key} item={item} isActive={isActive} />;
          })}
        </React.Fragment>
      )}
    </LinkWithChildrenContainer>
  );
};

export default LinkWithChildren;
