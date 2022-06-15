import { Button, Modal } from "antd";
import React from "react";
import { Alert } from "zent";
import "./index.less";

export const Home: React.FC<any> = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Alert title="俊劫的主页" description="加油加油，冲冲冲！！！"></Alert>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title=""
        visible={isModalVisible}
        onOk={handleOk}
        wrapClassName="J-Model"
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default Home;
