import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { Grid, Layout, Menu, Button, Drawer, ConfigProvider, theme } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  SunOutlined,
  MoonOutlined,
  MenuOutlined,
  FileTextOutlined,
  DashboardOutlined,
  UsergroupDeleteOutlined,
  UserSwitchOutlined,
  BarsOutlined
} from '@ant-design/icons';
import UserDropdown from '../components/UserDropdown';
import { useAuth } from '../context/AuthContext';
import LogoIntranet from '../components/LogoIntranet';
import { Footer } from 'antd/es/layout/layout';

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(() => {
    const storedTheme = localStorage.getItem("darkTheme");
    return storedTheme ? JSON.parse(storedTheme) : true;
  });
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();

  const hasPermission = (perm) =>
    user?.permissions?.map((p) => p.toLowerCase()).includes(perm.toLowerCase());

  const isMobile = !screens.md;

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
  };

  const toggleTheme = () => {
    setDarkTheme((prev) => {
      const newTheme = !prev;
      localStorage.setItem("darkTheme", JSON.stringify(newTheme));
      return newTheme;
    });
  };

  const toggleDrawer = () => {
    setDrawerVisible(prev => !prev);
  };

  const renderMenuItems = () => (
    <>
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/dashboard">Inicio</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        <Link to="/dashboard/perfil">Perfil</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        <Link to="/dashboard/productos">productos</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<UserOutlined />}>
        <Link to="/dashboard/medios">Medios</Link>
      </Menu.Item>
      <Menu.Item key="5" icon={<UserOutlined />}>
        <Link to="/dashboard/gerencias">Gerencia</Link>
      </Menu.Item>
      <Menu.Item key="6" icon={<UserOutlined />}>
        <Link to="/dashboard/areas">Area</Link>
      </Menu.Item>
      <Menu.Item key="7" icon={<UserOutlined />}>
        <Link to="/dashboard/distritos">Distritos</Link>
      </Menu.Item>
      {hasPermission("view_panel") && (
        <Menu.SubMenu key="sub1" icon={<DashboardOutlined />} title="Usuarios">
          <Menu.Item key="6" icon={<UsergroupDeleteOutlined />}>
            <Link to="/dashboard/usuarios/user">Usuarios</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<UserSwitchOutlined />}>
            <Link to="/dashboard/usuarios/roles">Roles</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<BarsOutlined />}>
            <Link to="/dashboard/usuarios/permisos">Permisos</Link>
          </Menu.Item>
        </Menu.SubMenu>
      )}
    </>
  );

  return (
    <ConfigProvider theme={{ algorithm: darkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <Layout style={{ minHeight: '100vh' }}>
        {!isMobile && (
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            theme={darkTheme ? 'dark' : 'light'}
          >
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <a href="/dashboard">
                <LogoIntranet collapsed={collapsed} size={screens} />
              </a>
            </div>
            <Menu theme={darkTheme ? 'dark' : 'light'} mode="inline" defaultSelectedKeys={['1']}>
              {renderMenuItems()}
            </Menu>
          </Sider>
        )}

        {isMobile && (
          <Drawer
            title="Menú"
            placement="left"
            closable={true}
            onClose={() => setDrawerVisible(false)}
            visible={drawerVisible}
            bodyStyle={{ padding: 0 }}
          >
            <Menu theme={darkTheme ? 'dark' : 'light'} mode="inline" defaultSelectedKeys={['1']}>
              {renderMenuItems()}
            </Menu>
          </Drawer>
        )}

        <Layout>
          <Header
            style={{
              background: darkTheme ? '#001529' : '#fff',
              padding: '0 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {isMobile && (
                <Button
                  onClick={toggleDrawer}
                  style={{ marginRight: '16px' }}
                  icon={<MenuOutlined />}
                />
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button
                onClick={toggleTheme}
                style={{ marginRight: '16px' }}
                icon={darkTheme ? <SunOutlined /> : <MoonOutlined />}
              />
              <UserDropdown email={user?.username} onLogout={handleLogout} />
            </div>
          </Header>

          <Content
            style={{
              margin: '16px',
              background: darkTheme ? '#141414' : '#fff',
              padding: '24px',
              minHeight: '280px'
            }}
          >
            <Outlet />
          </Content>

          <Footer
            style={{
              position: 'fixed',
              bottom: 0,
              width: '100%',
              textAlign: 'center',
              background: darkTheme ? '#141414' : '#fff',
              padding: '10px 0'
            }}
          >
            © 2025 Jefatura Nacional de Sistemas, Infraestructura y Desarrollo.
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Dashboard;
