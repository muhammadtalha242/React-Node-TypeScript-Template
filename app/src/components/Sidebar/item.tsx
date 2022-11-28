import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { ISidebarLink } from '../../iterators/sidebar';

interface Props {
  item: ISidebarLink;
  isActive: boolean;
}

const Item: React.FC<Props> = (props) => {
  const { item, isActive } = props;
  return (
    <Link to={item.link} className={classNames({ item: true, active: isActive, disabled: item.disabled })}>
      <img src={`/images/icons/sidebar/white-mode/${isActive ? 'active' : 'deactive'}/${item.icon}.svg`} alt="item" />
      <span className="label">{item.label}</span>
    </Link>
  );
};

export default Item;
