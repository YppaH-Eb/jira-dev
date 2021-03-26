import { Modal } from "antd";
import { useProjectModal } from "./utils";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Modal
      title={"创建项目"}
      okText={"确定"}
      cancelText={"取消"}
      visible={projectModalOpen}
      onCancel={close}
    >
      <h1>ProjectModal</h1>
    </Modal>
  );
};
