import { Modal } from "antd";

export const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal
      title={"创建项目"}
      okText={"确定"}
      cancelText={"取消"}
      visible={props.projectModalOpen}
      onCancel={props.onClose}
    >
      <h1>ProjectModal</h1>
    </Modal>
  );
};
