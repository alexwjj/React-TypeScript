import { Tree } from 'zent';
import * as React from 'react';

const treeData = [{
  id: 1,
  title: '杭州有赞科技有限公司',
  children: [{
    id: 2,
    title: '技术',
    children: [{
      id: 3,
      title: '后端',
      children: [{
        id: 7,
        title: 'JAVA'
      }, {
        id: 8,
        title: 'PHP'
      }, {
        id: 9,
        title: 'GO'
      }, {
        id: 10,
        title: '.NET'
      }]
    }, {
      id: 4,
      title: '运维'
    }, {
      id: 5,
      title: '前端'
    }]
  }, {
    id: 6,
    title: '产品'
  }]
}];

export default class JJTree extends React.Component {
  state = {
    checkedKeys: [3, 5, 22],
    disabledCheckedKeys: [4, 7, 9, 22]
  }

  onCheck = (checked: boolean, helpInfo: object) => {
    this.setState({
      checkedKeys: checked
    });
  }

  render() {
    const { checkedKeys, disabledCheckedKeys } = this.state;

    return (
      <div>
        <Tree
          checkable
          size="small"
          data={treeData}
          // @ts-ignore
          onCheck={this.onCheck}
          checkedKeys={checkedKeys}
          disabledCheckedKeys={disabledCheckedKeys}
        />
      </div>
    );
  }
}
