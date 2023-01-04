import React, { ChangeEvent, FC, FormEvent, useRef, useState } from 'react';
import styled from 'styled-components';
// import { v4 as uuidv4 } from 'uuid';
import { v4 as uuidv4 } from 'uuid';

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
  Collapse,
} from 'antd';
import {
  GlobalOutlined,
  DownOutlined,
  UserOutlined,
  UnlockOutlined,
  PlusOutlined,
  LaptopOutlined,
  MailOutlined,
  NodeCollapseOutlined,
  NotificationOutlined,
  ReadOutlined,
  ForkOutlined,
  DatabaseFilled,
} from '@ant-design/icons';
import Todos from '../../components/Todos';
import { StyledContainer } from '../../styles/Styles';
import Header from '../../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import type { FormInstance } from 'antd/es/form';
import { icons } from 'antd/es/image/PreviewGroup';
import { INew } from '../../interfaces/interface';

export interface IData {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  isCompleted: boolean;
}

const Home: FC = () => {
  const { Panel } = Collapse;

  const formRef1 = React.createRef<FormInstance>();
  const formRef2 = React.createRef<FormInstance>();
  const { Option } = Select;

  const [categoryList, setCategoryList] = useState([
    {
      name: 'All Tasks',
      icon: <NodeCollapseOutlined style={{ color: 'gray' }} />,
    },
    {
      name: 'General',
      icon: <NotificationOutlined style={{ color: 'green' }} />,
    },
  ]);

  // const [form1] = Form.useForm();
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [updateBtn, setUpdateBtn] = useState(false);

  const [taskToUpdate, setTaskToUpdate] = useState('');
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IData[]>([]);

  //
  const [open2, setOpen2] = useState(false);

  // const [newData, setNewData] = useState<INew[]>([]);

  // console.log(cat.map((x) => x.General));

  const notifySuccess = (x: string) =>
    toast.success(x, {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const handleOk = () => {
    alert('OK clicked');
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
  // :::::::::::::::::::::::::::::::::::::::::: NEW MODAL   ::::::::::::::::::::::::::::::::::::::::::::::
  const handleOk2 = () => {
    alert('OK clicked');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel2 = () => {
    setOpen2(false);
    form.resetFields();
    setUpdateBtn(false);
  };

  const showModal2 = () => {
    setOpen2(true);
  };

  const onFinishCategory = (values: any) => {
    console.log('form 2 submitted');
    console.log(values);

    const newCategory = {
      categoryN: values.category,
      icon: 'icon1',
      datas: [],
    };

    setCategoryList([
      ...categoryList,
      {
        name: newCategory.categoryN,
        icon: <NodeCollapseOutlined style={{ color: 'gray' }} />,
      },
    ]);

    notifySuccess('Category Added Successfully');
    form2.resetFields();
    handleCancel2();
  };

  const onFinishFailed2 = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  // :::::::::::::::::::::::::::::::::::::::::: NEW MODAL   ::::::::::::::::::::::::::::::::::::::::::::::

  const onFinish = (values: any) => {
    if (updateBtn) {
      console.log('updating data');
      setData(
        data.map((el: any) => {
          console.log(el);
          if (el.id === taskToUpdate) {
            return {
              ...el,
              id: uuidv4(),
              isCompleted: false,
              title: values.title,
              description: values.description,
              url: values.url,
              category: values.category,
            };
          }
          return el;
        })
      );
      notifySuccess('Task Updated Successfully');
      handleCancel();
    } else if (!updateBtn) {
      console.log('Adding data');

      const extra = {
        id: uuidv4(),
        isCompleted: false,
        ...values,
      };

      setData([...data, extra]);
      form.resetFields();
      notifySuccess('Task Added SuccessFully');

      setTimeout(() => {
        handleCancel();
      }, 500);
    }
  };
  console.log(data);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleDelete = (id: string) => {
    setData(
      data.filter((task) => {
        return task.id !== id;
      })
    );
    notifySuccess('Task Deleted SuccessFully');
  };

  const handleEdit = (id: string) => {
    setUpdateBtn(true);
    setTaskToUpdate(id);

    const xx = data.find((x) => x.id === id);
    console.log(xx);
    showModal();

    form.setFieldsValue({
      id: xx?.id,
      title: xx?.title,
      description: xx?.description,
      url: xx?.url,
      category: xx?.category,
    });
    console.log(id);
  };

  const NavItems = ['DRAG & DROP', 'AG FILTER', 'VIEW', ' EXPAND', 'COLLAPSE'];

  return (
    <StyledContainer className="">
      <Header />
      <ToastContainer />
      <Row gutter={[3, 12]} className="row-wrapper-nav">
        {NavItems.map((items) => {
          return (
            <Col className="gutter-row" lg={3} md={3} sm={2} xs={2}>
              <div className="content">{items}</div>
            </Col>
          );
        })}
        {/*:::::::::::::::::::::::::::;;;;:::::::::::::::: CATRGORY FORM :::::::::::::::::::::::::::::::*/}

        <Col className="gutter-row" lg={4} md={3} sm={2} xs={2}>
          <div className="content">
            <Button onClick={showModal2} icon={<PlusOutlined />}>
              {' '}
              ADD CATEGORY
            </Button>

            <Modal
              open={open2}
              onOk={handleOk2}
              onCancel={handleCancel2}
              footer={false}
            >
              <Row gutter={[24, 12]} className="row-wrapper">
                <Col className="gutter-row" lg={24} md={24} sm={16} xs={24}>
                  <div className="content">
                    <Form
                      form={form2}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      layout="horizontal"
                      onFinish={onFinishCategory}
                      onFinishFailed={onFinishFailed2}
                      initialValues={{ remember: true }}
                    >
                      <Form.Item
                        name="category"
                        label="Enter Category"
                        rules={[
                          {
                            required: true,
                            message: 'Please Enter any category name',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        style={{ display: 'none' }}
                        name="title"
                        label="Title"
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        style={{ display: 'none' }}
                        name="description"
                        label="Description"
                      >
                        <Input.TextArea />
                      </Form.Item>

                      <Form.Item
                        style={{ display: 'none' }}
                        name="url"
                        label="URL"
                      >
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
                            <Button block onClick={handleCancel2}>
                              Cancel
                            </Button>
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item wrapperCol={{ span: 24 }}>
                            <Button type="primary" block htmlType="submit">
                              {updateBtn ? 'Update' : 'Save'}
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>

                      {/* <Row gutter={12}>
                        <Col span={6}>
                          <Form.Item wrapperCol={{ span: 24 }}>
                            <Button type="primary" block htmlType="submit">
                              {updateBtn ? "Update" : "Save"}
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row> */}
                    </Form>
                  </div>
                </Col>
              </Row>
            </Modal>
          </div>
        </Col>
        {/*:::::::::::::::::::::::::::;;;;:::::::::::::::: CATRGORY FORM :::::::::::::::::::::::::::::::*/}

        {/*:::::::::::::::::::::::::::;;;;:::::::::::::::: INDIVIDUAL TASK :::::::::::::::::::::::::::::::*/}

        <Col className="gutter-row" lg={4} md={3} sm={2} xs={2}>
          <div className="content">
            <Button onClick={showModal} icon={<PlusOutlined />}>
              {' '}
              ADD TASK
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
                      ref={formRef2}
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
                            message: 'Please Enter Task Title!',
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
                          {categoryList.map((item, index) => (
                            <Option key={index} value={item.name}>
                              {item.name}
                            </Option>
                          ))}
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
                              {updateBtn ? 'Update' : 'Save'}
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
        {/*:::::::::::::::::::::::::::;;;;:::::::::::::::: INDIVIDUAL TASK :::::::::::::::::::::::::::::::*/}
      </Row>
      {/* <Navbar/> */}

      {/* Data List */}

      <Collapse defaultActiveKey={['1']} ghost>
        {categoryList.map((item, index) => {
          return (
            <Todos
              key={item.name}
              data={data.filter((elem) => {
                if (item.name === 'All Tasks') {
                  return data;
                } else {
                  return elem.category === item.name;
                }
              })}
              setOpen={setOpen}
              category={item.name}
              icon={item.icon}
              defaultKey={item.name === 'All Tasks' ? true : false}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              show={item.name === 'All Tasks' && true}
            />
          );
        })}
      </Collapse>
    </StyledContainer>
  );
};

export default Home;
