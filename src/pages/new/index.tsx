import React, { ChangeEvent, FC, FormEvent, useRef, useState } from 'react';
import styled from 'styled-components';
// import { v4 as uuidv4 } from 'uuid';
import { v4 as uuidv4 } from 'uuid';

import { Row, Form, Col, Input, Button, Modal, Select, Collapse } from 'antd';
import {
  GlobalOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { StyledContainer } from '../../styles/Styles';
import Header from '../../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface IData {
  categoryN: string;
  icon: React.ReactNode;
  actualData: {
    id: string;
    title: string;
    description: string;
    url: string;
    isCompleted: boolean;
  }[];
}

const Home2: FC = () => {
  const { Panel } = Collapse;
  const { Option } = Select;

  const InitialData = [
    {
      categoryN: 'General',
      icon: <GlobalOutlined style={{ fontSize: '1.3rem', color: 'green' }} />,
      actualData: [
        {
          id: uuidv4(),
          title: 'Default 01',
          description: 'Default Description',
          url: 'Default Url',
          isCompleted: false,
        },
      ],
    },
  ];

  // const [form1] = Form.useForm();
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const [updateBtn, setUpdateBtn] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState('');
  const [catToUpdate, setCatToUpdate] = useState('');

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [data, setData] = useState<IData[]>(InitialData);

  const [categoryList, setCategoryList] = useState(
    data.map((item) => {
      return { name: item.categoryN, icon: item.icon };
    })
  );

  // ::::::::::::::::::::::::::::::::::::::::::  MODAL  1  ::::::::::::::::::::::::::::::::::::::::::::::

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

  // :::::::::::::::::::::::::::::::::::::::::: MODAL 1  ::::::::::::::::::::::::::::::::::::::::::::::

  // :::::::::::::::::::::::::::::::::::::::::: MODAL 2  ::::::::::::::::::::::::::::::::::::::::::::::
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
    form2.resetFields();
    setUpdateBtn(false);
  };

  const showModal2 = () => {
    setOpen2(true);
  };

  const onFinish2 = (values: any) => {
    if (!updateBtn) {
      console.log('Adding Data');
      const x = {
        categoryN: values.category,
        icon: <GlobalOutlined style={{ fontSize: '1.3rem', color: 'green' }} />,
        actualData: [
          {
            id: uuidv4(),
            title: values.title,
            description: values.description,
            url: values.url,
            isCompleted: false,
          },
        ],
      };
      setData([...data, x]);

      setCategoryList([...categoryList, { name: x.categoryN, icon: x.icon }]);

      notifySuccess('Category Added Successfully');
      form2.resetFields();
      handleCancel2();
    }

    if (updateBtn) {
      console.log('updating Data');
      console.log('updating data');

      const newData = data.map((item) => {
        if (item.categoryN === catToUpdate) {
          return {
            ...item,
            actualData: item.actualData.map((dataItem) => {
              if (dataItem.id === taskToUpdate) {
                return {
                  ...dataItem,
                  title: values.title,
                  description: values.description,
                  url: values.url,
                  isCompleted: dataItem.isCompleted,
                };
              }
              return dataItem;
            }),
          };
        }
        return item;
      });

      setData(newData);

      notifySuccess('Task Updated Successfully');
      handleCancel2();
    }
  };

  const onFinishFailed2 = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  // :::::::::::::::::::::::::::::::::::::::::: MODAL 2  ::::::::::::::::::::::::::::::::::::::::::::::

  // :::::::::::::::::::::::::::::::::::::::::: TOAST MESSAGE   ::::::::::::::::::::::::::::::::::::::::::::::

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

  // :::::::::::::::::::::::::::::::::::::::::: TOAST MESSAGE   ::::::::::::::::::::::::::::::::::::::::::::::

  // :::::::::::::::::::::::::::  ADD COLLECTION FORM  ::::::::::::::::::::::::::::::::::::::::::
  const onFinish = (values: any) => {
    console.log('Success:', values);
    console.log('new form submitting');
    setData((prevState) => {
      // Create a new object that will replace the previous state
      const newState = [...prevState];

      // Find the index of the category in the newState array
      const categoryIndex = newState.findIndex(
        (cat) => cat.categoryN === values.category
      );

      // Check if the category exists in the newState array
      if (categoryIndex !== -1) {
        // If the category exists, add the new data to the actualData array
        newState[categoryIndex].actualData.push({
          id: uuidv4(),
          title: values.title,
          description: values.description,
          url: values.url,
          isCompleted: false,
        });
      } else {
        // If the category does not exist, add a new category with the new data
        newState.push({
          categoryN: values.category,
          icon: (
            <GlobalOutlined style={{ fontSize: '1.3rem', color: 'green' }} />
          ),
          actualData: [
            {
              id: uuidv4(),
              title: values.title,
              description: values.description,
              url: values.url,
              isCompleted: false,
            },
          ],
        });
      }

      // Return the new state object
      return newState;
    });

    form.resetFields();
    notifySuccess('Task Added SuccessFully');

    setTimeout(() => {
      handleCancel();
    }, 100);
  };
  // :::::::::::::::::::::::::::  ADD COLLECTION FORM  ::::::::::::::::::::::::::::::::::::::::::

  console.log(data);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleEdit2 = (c: string, id: string) => {
    setUpdateBtn(true);
    setCatToUpdate(c);
    setTaskToUpdate(id);
    const xx = data.find((x) => x.categoryN === c);
    const yy = xx?.actualData.find((x) => x.id === id);
    showModal2();

    form2.setFieldsValue({
      id: yy?.id,
      title: yy?.title,
      description: yy?.description,
      url: yy?.url,
      category: c,
    });
    console.log(id);
  };

  const handleDelete2 = (c: string, id: string) => {
    console.log('Delete button clicked');
    console.log(c);
    console.log(id);

    setData(
      data.map((item) => {
        if (item.categoryN === c) {
          return {
            ...item,
            actualData: item.actualData.filter((data) => data.id !== id),
          };
        }
        return item;
      })
    );

    notifySuccess('Task Deleted SuccessFully');
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
                      onFinish={onFinish2}
                      onFinishFailed={onFinishFailed2}
                      initialValues={{ remember: true }}
                    >
                      {/* {!updateBtn && ( */}
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
                      {/* )} */}

                      <Form.Item
                        name="title"
                        label="Title"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Please Enter Task Title!",
                        //   },
                        // ]}
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
                    </Form>
                  </div>
                </Col>
              </Row>
            </Modal>
          </div>
        </Col>

        <Col className="gutter-row" lg={4} md={3} sm={2} xs={2}>
          <div className="content">
            <Button onClick={showModal} icon={<PlusOutlined />}>
              {' '}
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

                      <Form.Item name="category" label="Category">
                        <Select placeholder="Select a category" allowClear>
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
      </Row>
      {/* <Navbar/> */}

      <Collapse defaultActiveKey={['1']} ghost>
        {data.map((item, index) => {
          return (
            <Panel header={item.categoryN} key={index + 1}>
              <Row gutter={[12, 12]} className="">
                {item?.actualData?.map((dItem, index) => {
                  return (
                    <Col className="gutter-row" lg={6} md={8} sm={12} xs={12}>
                      <div
                        className="Test-Card"
                        style={{ padding: '.5rem 1rem' }}
                      >
                        <Row
                          gutter={[2, 2]}
                          className=""
                          style={{
                            background: '',
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'start',
                          }}
                        >
                          <Col className="gutter-row" lg={4}>
                            <div style={{ marginTop: '6px' }}>{item.icon}</div>
                          </Col>
                          <Col className="gutter-row" lg={16}>
                            <div
                              style={{
                                display: 'flex',
                                gap: '2px',
                                flexDirection: 'column',
                              }}
                            >
                              <span>{dItem.title}</span>
                              <span>{dItem.description}</span>
                            </div>
                          </Col>
                        </Row>

                        <Row gutter={[12, 12]} className="">
                          <Col className="gutter-row" offset={18} lg={6}>
                            <div style={{ display: 'flex', gap: '10px' }}>
                              <EditOutlined
                                style={{ color: 'blue', fontSize: '1.2rem' }}
                                onClick={() => {
                                  handleEdit2(item.categoryN, dItem.id);
                                }}
                              />
                              <DeleteOutlined
                                style={{ color: 'red', fontSize: '1.2rem' }}
                                onClick={() => {
                                  handleDelete2(item.categoryN, dItem.id);
                                }}
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Panel>
          );
        })}
      </Collapse>

      {/* CATEGORIES */}

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

export default Home2;
