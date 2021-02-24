import { Menu, Icon } from 'zent';
const { MenuItem, SubMenu } = Menu;

const onClick = (e, key) => {
  console.log(e, key);
}

const MenuList = () => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKey="1-2"
      defaultExpandKeys={["1-4", "1-4-3"]}
      onClick={onClick}
    >
      <MenuItem key="1-1">
        食品分类
      </MenuItem>
      <MenuItem key="1-2">
        服装分类
      </MenuItem>
      <SubMenu title={<span><Icon type="youzan" />电器分类</span>} key="1-3">
        <MenuItem key="1-3-1">电视机</MenuItem>
        <MenuItem key="1-3-2">笔记本</MenuItem>
        <MenuItem key="1-3-3">洗衣机</MenuItem>
      </SubMenu>
      <SubMenu title={"美妆分类"} key="1-4">
        <MenuItem key="1-4-1">眼影</MenuItem>
        <MenuItem key="1-4-2">洗面奶</MenuItem>
        <SubMenu key="1-4-3" title={"食品分类"}>
          <MenuItem key="1-4-3-1">电视机</MenuItem>
          <MenuItem key="1-4-3-2">笔记本</MenuItem>
          <MenuItem key="1-4-3-3">洗衣机</MenuItem>
        </SubMenu>
      </SubMenu>
    </Menu>
  )
}
export default MenuList