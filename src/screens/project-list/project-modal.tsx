import { Form, Input, Modal, Spin } from "antd";
import { useProjectModal } from "./utils";
import { UserSelect } from "../../components/user-select";
import { useAddProject, useEditProject } from "../../utils/project";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { ErrorBox } from "../../components/lib";
import styled from "@emotion/styled";

export const ProjectModal = () => {
  const {
    projectModalOpen,
    close,
    editingProject,
    isLoading,
  } = useProjectModal();
  const title = editingProject ? "编辑项目" : "新建项目";
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();
  const [form] = useForm();
  const onFinish = () => {
    form.validateFields().then((values) => {
      mutateAsync({ ...editingProject, ...values }).then(() => {
        form.resetFields();
        close();
      });
    });
  };
  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);
  return (
    <Modal
      title={title}
      forceRender={true}
      okText={"确定"}
      cancelText={"取消"}
      onOk={onFinish}
      visible={projectModalOpen}
      onCancel={close}
      confirmLoading={mutateLoading}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <ErrorBox error={error} />
            <Form
              form={form}
              onFinish={onFinish}
              layout={"vertical"}
              style={{ width: "40rem" }}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入项目名称" }]}
              >
                <Input placeholder={"请输入项目名称"} />
              </Form.Item>
              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[{ required: true, message: "请输入部门名称" }]}
              >
                <Input placeholder={"请输入部门名称"} />
              </Form.Item>
              <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect defaultOptionName={"负责人"} />
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
