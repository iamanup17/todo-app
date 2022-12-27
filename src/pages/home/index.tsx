import React, { ChangeEvent, FC, FormEvent, useRef, useState } from "react";
import styled from "styled-components";
// import { v4 as uuidv4 } from 'uuid';
import { v4 as uuidv4 } from "uuid";

import {
  Row,
  Form,
  Col,
  Input,
  Button,
  Checkbox,
  Modal,
  Descriptions,
  Select,
} from "antd";
import {
  GlobalOutlined,
  DownOutlined,
  UserOutlined,
  UnlockOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Todos from "../../components/Todos";
import { StyledContainer } from "../../styles/Styles";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type { FormInstance } from "antd/es/form";

export interface IData {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
}

const Home: FC = () => {
  const formRef = React.createRef<FormInstance>();
  const { Option } = Select;

  let categories = [
    "All Tasks",
    "General",
    "Technology",
    "Health & Hobbies",
    "Others",
  ];

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [updateBtn, setUpdateBtn] = useState(false);

  const [taskToUpdate, setTaskToUpdate] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IData[]>([]);

  const [cat, setCat] = useState([
    {
      General: [
        {
          title: "",
          description: "",
          url: "",
        },
      ],
    },
    {
      Technology: [
        {
          title: "",
          description: "",
          url: "",
        },
      ],
    },
    {
      Health: [
        {
          title: "",
          description: "",
          url: "",
        },
      ],
    },
    {
      Others: [
        {
          title: "",
          description: "",
          url: "",
        },
      ],
    },
  ]);

  console.log(cat.map((x) => x.General));

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

  // {categories.map((item) => {
  //   return (
  //     <Todos
  //       data={data.filter(
  //         (elem) => {
  //           if (item == "All") {
  //             return data;
  //           } else {
  //             return elem.category === item;
  //           }
  //         }
  //       )}
  //       category={item}
  //       defaultKey={true}
  //       handleDelete={handleDelete}
  //       handleEdit={handleEdit}
  //     />
  //   );
  // })}

  const onFinish = (values: any) => {
    console.log("Success:", values);



    if (updateBtn) {
      console.log("updating data");
      setData(
        data.map((el: any) => {
          console.log(el);
          if (el.id === taskToUpdate) {
            return {
              ...el,
              id: values.id,
              title: values.title,
              description: values.description,
              url: values.url,
              category: values.category,
            };
          }
          return el;
        })
      );
      notifySuccess("Task Updated Successfully");
      handleCancel();
    }
    // else if (!update) {
    if (!updateBtn) {
      console.log("Adding data");

      const id = {
        id: uuidv4(),
        ...values,
      };

      setData([...data, id]);
      form.resetFields();
      notifySuccess("Task Added SuccessFully");

      setTimeout(() => {
        handleCancel();
      }, 500);
    }
    // }
  };

  console.log(data);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleDelete = (id: string) => {
    setData(
      data.filter((task) => {
        return task.id !== id;
      })
    );
    notifySuccess("Task Deleted SuccessFully");
  };

  const handleEdit = (id: string) => {
    setUpdateBtn(true);
    setTaskToUpdate(id);

    const xx = data.find((x) => x.id === id);
    console.log(xx);
    showModal();

    form.setFieldsValue({
      title: xx?.title,
      description: xx?.description,
      url: xx?.url,
      category: xx?.category,
    });
    console.log(id);
  };

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

                      <Form.Item
                        name="category"
                        label="Category"
                        // rules={[{ required: true }]}
                      >
                        <Select
                          placeholder="Select a category"
                          // onChange={onGenderChange}
                          allowClear
                        >
                          {categories.map((item) => (
                            <Option value={item}>{item}</Option>
                          ))}
                          {/* <Option value="general">General</Option>
                          <Option value="technology">Technology</Option>
                          <Option value="health">Health & Hobbies</Option>
                          <Option value="others">Others</Option> */}
                        </Select>
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
                            <Button type="primary" danger block disabled>
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
          </div>
        </Col>
      </Row>
      {/* <Navbar/> */}

      {/* CATEGORIES */}

      {categories.map((item) => {
        return (
          <Todos
            data={data.filter((elem) => {
              if (item == "All Tasks") {
                return data;
              } else {
                return elem.category === item;
              }
            })}
            category={item}
            defaultKey={true}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        );
      })}

      {/* <Todos
        data={data.filter((item) => item.category === "general")}
        category="General"
        defaultKey={true}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />

      <Todos
        data={data.filter((item) => item.category === "technology")}
        category="Technology"
        defaultKey={false}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
      <Todos
        data={data.filter((item) => item.category === "health")}
        category="Health & Hobbies"
        defaultKey={false}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
      <Todos
        data={data.filter((item) => item.category === 'others')}
        category="Others"
        defaultKey={false}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
      <Todos
        data={data}
        category="All"
        defaultKey={false}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      /> */}
    </StyledContainer>
  );
};

export default Home;
