import React, { ChangeEvent, FC, FormEvent, useRef, useState } from "react";
import styled from "styled-components";
import {
  Row,
  Form,
  Col,
  Input,
  Button,
  Checkbox,
  Modal,
  Descriptions,
} from "antd";
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

import type { FormInstance } from "antd/es/form";
import FormItem from "antd/es/form/FormItem";

export interface IData {
  title: string;
  description: string;
  url: string;
}

const Home: FC = () => {


  const formRef = React.createRef<FormInstance>();

  // const initial = {
  //   title: "Default",
  //   description: "Default",
  //   url: "Default",
  // };
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [updateBtn, setUpdateBtn] = useState(false);

  const [taskToUpdate, setTaskToUpdate] = useState("");
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
    form.resetFields();
    setUpdateBtn(false);
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
    if (updateBtn) {
      console.log("updating data")
      setData(
       

        data.map((el:any) => {
          console.log(el)
          if (el.title === taskToUpdate) {
            return {
             ...el,
              title: values.title,
              description: values.description,
              url: values.url,
            };
          }
          return el
        })
      );
      notifySuccess("Task Updated Successfully")
      handleCancel();
    }
    // else if (!update) {
    if (!updateBtn) {
      console.log("Adding data");
      setData([...data, values]);
      form.resetFields();
      notifySuccess("Task Added SuccessFully");

      setTimeout(() => {
        handleCancel();
      }, 500);
    }
    // }
  };

  console.log(data)
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

  const handleEdit = (taskName: string) => {
    setUpdateBtn(true);
    setTaskToUpdate(taskName);
    
    const xx = data.find((x) => x.title === taskName);
    console.log(xx);
    showModal();

    form.setFieldsValue({
      title: xx?.title,
      description: xx?.description,
      url: xx?.url,
    });



    console.log(taskName)

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
                      ref={formRef}
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
                              {updateBtn ? "Update" : "Save"}
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Col>
              </Row>
            </Modal>

            {/* MODAL 2 */}
            {/* <Modal
              title="Basic Modal"
              open={isModalOpen}
              onOk={handleOk2}
              onCancel={handleCancel2}
            >
              <form onSubmit={handleSubmit2}>
                <input
                  type="text"
                  name="title"
                  onChange={(e) => handleChange2(e)}
                  value={inputData.title2}
                />
                <input
                  type="text"
                  name="description"
                  onChange={(e) => handleChange2(e)}
                  value={inputData.description2}
                />
                <input
                  type="text"
                  name="url"
                  onChange={(e) => handleChange2(e)}
                  value={inputData.url2}
                />
                <button>submit</button>
              </form>
            </Modal> */}
            {/* MODAL 2 */}
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

      <Todos
        data={data}
        category="Technology"
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
