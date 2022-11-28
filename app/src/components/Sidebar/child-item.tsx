import React from 'react';
import classNames from 'classnames';

import { ChildItemContainer } from './container';
import { ISidebarLink } from '../../iterators/sidebar';

interface Props {
  item: ISidebarLink;
  isActive: boolean;
}

const ChildItem: React.FC<Props> = (props) => {
  const { item, isActive } = props;
  return (
    <ChildItemContainer to={item.link} className={classNames({ active: isActive, disabled: item.disabled })}>
      <img src={`/images/icons/sidebar/white-mode/${isActive ? 'active' : 'deactive'}/${item.icon}.svg`} alt="item" />
      <span className="label">{item.label}</span>
    </ChildItemContainer>
  );
};

export default ChildItem;
