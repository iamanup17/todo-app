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
import Header from "./Header";
import Navbar from "./Navbar";
import Todos from "./Todos";

export interface IData {
  title: string;
  description: string;
  url: string;
}

const { Panel } = Collapse;

const Container = styled.div`
  width: 98vw;
  height: 100%;
  /* margin: 10px auto; */
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #13151f;
  color: #efefef;

  .row-wrapper {
    color: #656565;
  }
  .row-wrapper-Header {
    /* margin: 12px; */
    /* background:wheat; */
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid gray;
    padding-bottom: 10px;

    /* border-bottom:1px solid gray */
    /* background:orange */
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 10px;
    border-radius: 8px;
    color: #747474;

    span {
      color: #cfcfcf;
    }
    small {
      color: #acacac;
    }
  }

  .row-wrapper-nav {
    border-bottom: 1px solid gray;
    padding-bottom: 10px;
    .content {
      justify-content: center;
      align-items: center;
      color: white;
      /* border:none; */
    }
  }

  .row-wrapper-collapse {
    padding-bottom: 10px;
    border-bottom: 1px solid gray;
    .row-wrapper .content {
      flex-direction: row;
      align-items: center;
      border: 1px solid gray;
      color: white;
    }
  }
`;

const Home: FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IData[]>([]);

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

  const onFinish = (values: any) => {
    console.log("Success:", values);
    setData([...data, values]);
    form.resetFields();
    setTimeout(() => {
      handleCancel();
    }, 500);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const Head = (
    <span style={{ color: "white" }}>
      {" "}
      General <DownOutlined />
    </span>
  );

  return (
    <Container className="">
      <Header />

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
            <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
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
      <Todos data={data} category="General" defaultKey={true} />
      <Todos data={data} category="Technology" defaultKey={false} />
    </Container>
  );
};

export default Home;


  /* <Row gutter={[3, 12]} className="row-wrapper row-wrapper-collapse">
<Col className="gutter-row" lg={24} md={3} sm={2} xs={2}>
  <div className="content">
    <Collapse accordion bordered={false}>
      <Panel header="General" key="1">
        <Row gutter={[12, 12]} className="row-wrapper">
          <Col className="gutter-row" lg={6} md={3} sm={2} xs={2}>
            <div className="content">
              {" "}
              <GlobalOutlined /> DRAG & DROP{" "}
            </div>
          </Col>
          <Col className="gutter-row" lg={6} md={3} sm={2} xs={2}>
            <div className="content">
              {" "}
              <GlobalOutlined /> DRAG & DROP{" "}
            </div>
          </Col>
          <Col className="gutter-row" lg={6} md={3} sm={2} xs={2}>
            <div className="content">
              {" "}
              <GlobalOutlined /> DRAG & DROP{" "}
            </div>
          </Col>
          <Col className="gutter-row" lg={6} md={3} sm={2} xs={2}>
            <div className="content">
              {" "}
              <GlobalOutlined /> DRAG & DROP{" "}
            </div>
          </Col>
          <Col className="gutter-row" lg={6} md={3} sm={2} xs={2}>
            <div className="content">
              {" "}
              <GlobalOutlined /> DRAG & DROP{" "}
            </div>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  </div>
</Col>
</Row> */

