import {
  Sidebar as MenuSidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import {
  PiListBullets as IconMenu,
  PiLayout,
  PiIntersectThreeLight,
} from "react-icons/pi";
import { Link } from "react-router-dom";

function Sidebar({ collapsed, setCollapsed, changeTitleAdmin }) {
  return (
    <div className="sidebar-wrapper">
      <MenuSidebar
        collapsed={collapsed}
        backgroundColor="#bcf3ff"
        className="sidebar-content"
        transitionDuration={600}
      >
        <Menu>
          <MenuItem
            icon={<IconMenu />}
            onClick={() => setCollapsed(!collapsed)}
          >
            Menu
          </MenuItem>
          <Link
            to=""
            className="menu-item"
            onClick={() => changeTitleAdmin("Dashboard")}
          >
            <PiLayout className="menu-icon" />
            <span>Dashboard</span>
          </Link>

          <SubMenu label="Features" icon={<PiIntersectThreeLight />}>
            <Link
              to="manage_users"
              className="sub-item"
              onClick={() => changeTitleAdmin("Quản lý Users")}
            >
              Quản lý Users
            </Link>
            <Link
              to="manage_quiz"
              className="sub-item"
              onClick={() => changeTitleAdmin("Quản lý Quiz")}
            >
              Quản lý Quiz
            </Link>
            <Link
              to="manage_question"
              className="sub-item"
              onClick={() => changeTitleAdmin("Quản lý Question")}
            >
              Quản lý Question
            </Link>
          </SubMenu>
          <MenuItem> Documentation </MenuItem>
        </Menu>
      </MenuSidebar>
    </div>
  );
}

export default Sidebar;
