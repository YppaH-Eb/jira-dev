import { Modal } from "antd";

export const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal visible={props.projectModalOpen} onCancel={props.onClose}>
      <h1>ProjectModal</h1>
    </Modal>
  );
};
