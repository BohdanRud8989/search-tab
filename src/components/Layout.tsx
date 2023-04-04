import { Space } from "antd";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <Space
      direction="horizontal"
      align="center"
      style={{ width: "100vw", height:'100vh', justifyContent: "center" }}
    >
      {children}
    </Space>
  );
}

export default Layout;
