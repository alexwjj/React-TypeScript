import cn from 'classnames';
import React from 'react';
import { Icon, IIconProps, IPopCommonProps, Pop } from 'zent';

interface IProps extends IPopCommonProps {
  iconType?: IIconProps['type'];
  iconClassName?: string;
  iconStyle?: IIconProps['style'];
  spin?: boolean;
}

export const HelpIcon: React.FC<IProps> = (props) => {
  const { iconType = 'help-circle-o', iconClassName, iconStyle, className,spin, ...popProps } = props;

  return (
    <Pop trigger="hover" className={cn('help-icon__pop', className)} {...popProps}>
      <Icon style={iconStyle} className={cn('help-icon__icon', iconClassName)} type={iconType} spin={spin}/>
    </Pop>
  );
};

export default HelpIcon;
