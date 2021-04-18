import "./index.less";
// @ts-ignore
// import s from "./style.module.css";

import React from "react";
import { BlockHeader, Alert, Notify } from "zent";
import AffixTabsNav from "../../components/affix-tabs-nav";
import ContentTitle from "../../components/content-title";
import VipIcon from "../../components/vip-icon";
import AppCard from "../../components/app-card";

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
  const onAppClick = () => {
    Notify.info("appcard被点击");
  };
  const list = [
    {
      title: "app卡片标题1",
      desc: "app卡片描述信息1111",
      icon:
        "https://img01.yzcdn.cn/upload_files/2021/04/14/Fjumo6k-YcHhLVs_-XHHuyZn2sjH.png",
      href: "www.youzan.com",
      onClick: onAppClick,
    },
    {
      title: "app卡片标题2",
      desc: "app卡片描述信息2222",
      icon:
        "https://img01.yzcdn.cn/upload_files/2021/04/14/FijAV5lSau2S97W7Bj8wCNl0YCfs.png",
      href: "www.youzan.com",
      onClick: onAppClick,
    },
  ];
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
      <BlockHeader title="应用中心-appcard组件封装"></BlockHeader>
      {list.map((item, index) => {
        return (
          <AppCard
            key={index}
            title={item.title}
            desc={item.desc}
            icon={item.icon}
            href={item.href}
            onClick={item.onClick}
          />
        );
      })}
    </div>
  );
}

export default ScrmComponent;
