import React, { FC, useState } from "react";
import styled from "styled-components";
import { Row, Form, Col, Input, Button, Checkbox, Modal } from "antd";
import {
  GlobalOutlined,
  DownOutlined,
  UserOutlined,
  UnlockOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Collapse } from "antd";
import Todos from "../../components/Todos";
import { StyledContainer } from "../../styles/Styles";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface IData {
  title: string;
  description: string;
  url: string;
}

const Home: FC = () => {
  const initial = {
    title: "Default",
    description: "Default",
    url: "Default",
  };
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IData[]>([initial]);

  const handleOk = () => {
    alert("OK clicked");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };
  const notifySuccess = (x: string) =>
    toast.success(x, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const onFinish = (values: any) => {
    console.log("Success:", values);
    setData([...data, values]);
    form.resetFields();
    notifySuccess("Task Added SuccessFully");

    setTimeout(() => {
      handleCancel();
    }, 500);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleDelete = (taskName: string) => {
    setData(
      data.filter((task) => {
        return task.title !== taskName;
      })
    );
    notifySuccess("Task Deleted SuccessFully");
  };

  const  handleEdit = (taskName: string) => {
    showModal()
    console.log(form.getFieldValue)
    // notifySuccess("Task Deleted SuccessFully");
  };

 

  const Head = (
    <span style={{ color: "white" }}>
      {" "}
      General <DownOutlined />
    </span>
  );

  return (
    <StyledContainer className="">
      <Header />
      <ToastContainer />
      <Row gutter={[3, 12]} className="row-wrapper-nav">
        <Col className="gutter-row" lg={3} md={3} sm={2} xs={2}>
          <div className="content">DRAG & DROP </div>
        </Col>
        <Col className="gutter-row" lg={3} md={3} sm={2} xs={2}>
          <div className="content">TAG FILTER</div>
        </Col>
        <Col className="gutter-row" lg={3} md={3} sm={2} xs={2}>
          <div className="content">VIEW</div>
        </Col>
        <Col className="gutter-row" lg={3} md={3} sm={2} xs={2}>
          <div className="content">EXPAND</div>
        </Col>
        <Col className="gutter-row" lg={3} md={3} sm={2} xs={2}>
          <div className="content">COLLAPSE</div>
        </Col>
        <Col className="gutter-row" offset={4} lg={5} md={3} sm={2} xs={2}>
          <div className="content">
            <Button onClick={showModal} icon={<PlusOutlined />}>
              {" "}
              ADD COLLECTION
            </Button>

            <Modal
              open={open}
              //   title="Title"
              onOk={handleOk}
              onCancel={handleCancel}
              footer={false}
            >
              <Row gutter={[24, 12]} className="row-wrapper">
                <Col className="gutter-row" lg={24} md={24} sm={16} xs={24}>
                  <div className="content">
                    <Form
                      form={form}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      layout="horizontal"
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      initialValues={{ remember: true }}
                    >
                      <Form.Item
                        name="title"
                        label="Title"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Task Title!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item name="description" label="Description">
                        <Input.TextArea />
                      </Form.Item>
                      <Form.Item name="url" label="URL">
                        <Input />
                      </Form.Item>

                      <Row gutter={12}>
                        <Col span={6}>
                          <Form.Item wrapperCol={{ span: 24 }}>
                            <Button type="primary" danger block>
                              Delete
                            </Button>
                          </Form.Item>
                        </Col>
                        <Col span={6} offset={6}>
                          <Form.Item wrapperCol={{ span: 24 }}>
                            <Button block onClick={handleCancel}>
                              Cancel
                            </Button>
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item wrapperCol={{ span: 24 }}>
                            <Button type="primary" block htmlType="submit">
                              Save
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Col>
              </Row>
            </Modal>
          </div>
        </Col>
      </Row>
      {/* <Navbar/> */}

      {/* CATEGORIES */}
      <Todos
        data={data}
        category="General"
        defaultKey={true}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
      {/* <Todos data={data} category="Technology" defaultKey={false} /> */}
      {/* <Todos data={data} category="Technology" defaultKey={false} /> */}
      {/* <Todos data={data} category="Technology" defaultKey={false} /> */}
      {/* <Todos data={data} category="Technology" defaultKey={false} /> */}
    </StyledContainer>
  );
};

export default Home;
