import React, { useCallback } from 'react';
import { ClampLines } from 'zent';
import './style/index.scss'

interface IAppCard {
  href: string;
  icon?: string;
  title: string;
  desc: string;
  className?: string;
  imgColorClassName?: string;
  fontIcon?: string;
  onClick: (appName: string) => void;
}

// TODO: 修改 title 为 POP
const AppCard: React.FC<IAppCard> = (props) => {
  const { href, icon, title, desc, className = '', imgColorClassName = '', fontIcon, onClick } = props;

  const imgClassName = `app-card-wrapper-icon ${imgColorClassName}`;

  const iconImg = fontIcon ? (
    <div className={`${imgClassName} app-card-wrapper-font-icon`}>{fontIcon}</div>
  ) : (
    <img alt="" src={icon} className={imgClassName} />
  );

  const onCardClick = useCallback(() => onClick(title), [onClick, title]);

  return (
    <a className={`app-card-wrapper ${className}`} href={href} target="_blank" rel="noopener noreferrer" onClick={onCardClick}>
      {iconImg}
      <div className="app-card-wrapper-content">
        <p className="app-card-wrapper-content-title">{title}</p>
        <ClampLines text={desc} lines={1} resizable popWidth={360} className="app-card-wrapper-content-desc" />
      </div>
    </a>
  );
};

export default AppCard;
