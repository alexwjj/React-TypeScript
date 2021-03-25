import cn from "classnames";
import React from "react";
import "./style/index.less";
import { Icon,IIconProps } from "zent";

interface IProps extends IIconProps {
  title: string;
  color?: string;
  iconClassName?: string;
  titleClassName?: string;
}


export const ContentTitle: React.FC<IProps> = (props) => {
  const { title, iconClassName, titleClassName, ...popProps } = props;

  return (
    <div className={cn("content-title", titleClassName)}>
      {title}
      <Icon
        className={cn("content-title__icon", iconClassName)}
        {...popProps}
      />
    </div>
  );
};

export default ContentTitle;
