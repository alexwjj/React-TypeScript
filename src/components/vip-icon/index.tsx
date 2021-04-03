import React from 'react';

import './index.less';

const vipSprites = 'https://b.yzcdn.cn/yzscrm/customer/vip-sprites.png';

const VipRender = ({ vip = 0 }) => {
  return <img src={vipSprites} className="vip" style={{ objectPosition: `0 -${vip * 16}px` }} alt="icon"/>;
};
export default VipRender;
