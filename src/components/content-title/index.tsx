import cn from "classnames";
import React from "react";
import "./style/index.less";
import { Icon,IIconProps } from "zent";

interface IProps {
  title: string;
  iconType?: IIconProps['type'];
  isShowIcon?: boolean;
  iconClassName?: string;
  titleClassName?: string;
}


export const ContentTitle: React.FC<IProps> = (props) => {
  const { title, iconType = 'youzan', isShowIcon = false , iconClassName, titleClassName, ...popProps } = props;

  return (
    <div className={cn("content-title", titleClassName)}>
      {title}
      {isShowIcon && <Icon
        className={cn("content-title__icon", iconClassName)}
        {...popProps}
        type={iconType}
      />}
    </div>
  );
};

export default ContentTitle;
