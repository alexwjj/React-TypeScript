import "./index.less";
// @ts-ignore
// import s from "./style.module.css";

import React from "react";
import { BlockHeader, Alert } from "zent";
import AffixTabsNav from "../../components/affix-tabs-nav";
import ContentTitle from "../../components/content-title";
import VipIcon from "../../components/vip-icon";


function ScrmComponent() {

  const tabsProps = {
    stretch: true,
    tabs: [
      {
        key: "cards",
        title: "运营计划",
        target: "#plan-list-cards",
      },
      {
        key: "table",
        title: "计划列表",
        target: "#plan-list-table",
      },
    ],
  };
  return (
    <div className="scrm-components">
      <Alert
        type="info"
        outline
        title="封装一些组件"
        description="熟悉项目中已有的一些组件，同时学习代码规范等"
      />
      <BlockHeader title="标题组件"></BlockHeader>
      <ContentTitle
        isShowIcon
        title="有你有赞"
        iconClassName="icon-youzan"
      ></ContentTitle>
      <BlockHeader title="会员等级组件，根据会员等级显示不同图标"></BlockHeader>
      <VipIcon vip={0}></VipIcon>
      <VipIcon vip={1}></VipIcon>
      <VipIcon vip={10}></VipIcon>
      <BlockHeader title="图钉和tab的封装"></BlockHeader>
      <AffixTabsNav
        offset={48}
        affixProps={{ offsetTop: 0 }}
        tabsProps={tabsProps}
      />
      <BlockHeader title="图钉和tab的封装"></BlockHeader>

    </div>
  );
}

export default ScrmComponent;
