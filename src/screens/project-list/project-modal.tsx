import { Form, Modal, Spin } from "antd";
import { useProjectModal } from "./utils";

export const ProjectModal = () => {
  const {
    projectModalOpen,
    close,
    editingProject,
    isLoading,
  } = useProjectModal();
  const title = editingProject ? "编辑项目" : "新建项目";
  return (
    <Modal
      title={title}
      okText={"确定"}
      cancelText={"取消"}
      visible={projectModalOpen}
      onCancel={close}
    >
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <>
          <Form layout={"vertical"} style={{ width: "40rem" }}></Form>
        </>
      )}
      <h1>ProjectModal</h1>
    </Modal>
  );
};
