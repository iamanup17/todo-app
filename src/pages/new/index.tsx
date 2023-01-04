import React, { ChangeEvent, FC, FormEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { Row, Col, Input, Button, Modal, Collapse } from 'antd';

import { Select, Form } from 'antd';
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
import Todo from '../../components/Todo';
import { IData, IData2 } from '../../interfaces/interface';

const Home2: FC = (props) => {
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

  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const [updateBtn, setUpdateBtn] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState('');
  const [catToUpdate, setCatToUpdate] = useState('');

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [data, setData] = useState<IData[]>(InitialData);

  const [reference, setReference] = useState<any>({});

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
  const handleOkCategory = () => {
    alert('OK clicked');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancelCategory = () => {
    setOpen2(false);
    form2.resetFields();
    setUpdateBtn(false);
  };

  const showModal2 = () => {
    setOpen2(true);
  };

  const onFinishCategory = (values: any) => {
    console.log('on finish category');
    console.log('Adding Data');
    const x = {
      categoryN: values.category,
      icon: <GlobalOutlined style={{ fontSize: '1.3rem', color: 'green' }} />,
      actualData: [
        // {
        //   id: uuidv4(),
        //   title: values.title,
        //   description: values.description,
        //   url: values.url,
        //   isCompleted: false,
        // },
      ],
    };
    setData([...data, x]);
    setCategoryList([...categoryList, { name: x.categoryN, icon: x.icon }]);
    notifySuccess('Category Added Successfully');
    form2.resetFields();
    handleCancelCategory();
  };

  const onFinishCategoryFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  // :::::::::::::::::::::::::::::::::::::::::: MODAL 2  ::::::::::::::::::::::::::::::::::::::::::::::

  // :::::::::::::::::::::::::::  ADD COLLECTION FORM  ::::::::::::::::::::::::::::::::::::::::::
  const onFinishTask = (values: any) => {
    const { category, title, description, url } = values;
    console.log('Success:', values);
    console.log('new form submitting');

    if (!updateBtn) {
      setData((prevState) => {
        // Create a new object that will replace the previous state
        const newState = [...prevState];
        // Find the index of the category in the newState array
        const categoryIndex = newState.findIndex(
          (cat) => cat.categoryN === values.category
        );

        console.log(categoryIndex);

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
        }
        // else {
        //   // const nbv =
        //   // If the category does not exist, add a new category with the new data
        //   newState.push({
        //     categoryN: "General",
        //     icon: (
        //       <GlobalOutlined style={{ fontSize: "1.3rem", color: "green" }} />
        //     ),
        //     actualData: [
        //       {
        //         id: uuidv4(),
        //         title: values.title,
        //         description: values.description,
        //         url: values.url,
        //         isCompleted: false,
        //       },
        //     ],
        //   });
        //   setCategoryList([
        //     ...categoryList,
        //     {
        //       name: "Others",
        //       icon: (
        //         <GlobalOutlined
        //           style={{ fontSize: "1.3rem", color: "green" }}
        //         />
        //       ),
        //     },
        //   ]);
        // }

        // Return the new state object
        return newState;
      });

      form.resetFields();
      notifySuccess('Task Added SuccessFully');

      setTimeout(() => {
        handleCancel();
      }, 100);
    }

    if (updateBtn) {
      const newData = data.map((item) => {
        if (item.categoryN === values.category) {
          console.log('In same category blovk');
          console.log('need to change -', category);
          return {
            ...item,
            actualData: item.actualData.map((dataItem) => {
              if (dataItem.id === taskToUpdate) {
                return {
                  ...dataItem,
                  title,
                  description,
                  url,
                  isCompleted: false,
                };
              }

              return dataItem;
            }),
          };
        } else if (item.categoryN !== values.category) {
          console.log('else block running');
          return {
            ...item,
            actualData: item.actualData.filter(
              (task) => task.id !== taskToUpdate
            ),
          };
        }

        return item;
      });

      setData(newData);
      // dsmlsfksdfkf

      const taskId = taskToUpdate;
      const newCategory = values.category;

      // setData(
      //   data.map((item) => {
      //     if (item.categoryN === newCategory) {
      //       return {
      //         ...category,
      //         actualData: [...item.actualData, { values }],
      //       };
      //     }
      //     return item;
      //   })
      // );

      // setData((prevData: any) => {
      //   const updatedData = prevData.map((category: any) => {
      //     if (category.categoryN === newCategory) {
      //       return {
      //         ...category,
      //         actualData: [
      //           ...category.actualData,
      //           prevData
      //             .find((c: any) =>
      //               c.actualData.some((task: any) => task.id === taskId)
      //             )
      //             .actualData.find((task: any) => task.id === taskId),
      //         ],
      //       };
      //     } else if (
      //       category.actualData.some((task: any) => task.id === taskId)
      //     ) {
      //       return {
      //         ...category,
      //         actualData: category.actualData.filter(
      //           (task: any) => task.id !== taskId
      //         ),
      //       };
      //     } else {
      //       return category;
      //     }
      //   });
      //   return updatedData;
      // });

      // dsmlsfksdfkf

      // const editedTask = {
      //   id: uuidv4(),
      //   title: values.title,
      //   description: values.description,
      //   url: values.url,
      //   isCompleted: true,
      //   category: values.category,
      //   originalCategory: catToUpdate,
      // };

      // setData(
      //   data.map((item) => {
      //     if (item.categoryN === editedTask.category) {
      //       return {
      //         ...item,
      //         actualData: [...item.actualData, editedTask],
      //       };
      //     }
      //      else if (item.categoryN === editedTask.originalCategory) {
      //       return {
      //         ...item,
      //         actualData: item.actualData.filter(
      //           (task) => task.id !== editedTask.id
      //         ),
      //       };
      //     }
      //     return item;
      //   })
      // );

      notifySuccess('Task Updated Successfully');
      handleCancel();
    }
  };
  // :::::::::::::::::::::::::::  ADD COLLECTION FORM  ::::::::::::::::::::::::::::::::::::::::::

  const onFinishTaskFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleEdit = (c: string, id: string) => {
    setUpdateBtn(true);
    setCatToUpdate(c);
    setTaskToUpdate(id);
    const xx = data.find((x) => x.categoryN === c);
    const yy = xx?.actualData.find((x) => x.id === id);
    showModal();

    setReference({
      id: yy?.id,
      title: yy?.title,
      description: yy?.description,
      url: yy?.url,
      category: c,
    });

    form.setFieldsValue({
      id: yy?.id,
      title: yy?.title,
      description: yy?.description,
      url: yy?.url,
      category: c,
    });
    console.log(id);
  };

  const handleDelete = (c: string, id: string) => {
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

  const [categoryList, setCategoryList] = useState(
    data.map((item) => {
      return { name: item.categoryN, icon: item.icon };
    })
  );

  // console.log(categoryList);
  console.log(data);

  return (
    <StyledContainer className="">
      <Header />

      <ToastContainer />
      <Row gutter={[3, 12]} className="row-wrapper-nav">
        {/* {
          NavData.map((item , index))
        } */}
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
        {/* :::::::::::::::::::::     CATEGORY    :::::::::::::::::::: */}
        <Col className="gutter-row" lg={4} md={3} sm={2} xs={2}>
          <div className="content">
            <Button onClick={showModal2} icon={<PlusOutlined />}>
              {' '}
              ADD CATEGORY
            </Button>

            <Modal
              open={open2}
              onOk={handleOkCategory}
              onCancel={handleCancelCategory}
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
                      onFinishFailed={onFinishCategoryFailed}
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

                      {/* <Form.Item
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
                      </Form.Item> */}

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
                            <Button block onClick={handleCancelCategory}>
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
        {/* :::::::::::::::::::::     CATEGORY    :::::::::::::::::::: */}

        {/* :::::::::::::::::::::     TASK    :::::::::::::::::::: */}

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
                      form={form}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      layout="horizontal"
                      onFinish={onFinishTask}
                      onFinishFailed={onFinishTaskFailed}
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
                        initialValue={'General'}
                        label="Category"
                      >
                        {/* {Form.getFieldDecorator("select", {
                          initialValue: "General",
                        })(
                          <Select defaultValue={"General"}>
                            {categoryList.map((item, index) => (
                              <Option key={index} value={item.name}>
                                {item.name}
                              </Option>
                            ))}
                          </Select>
                        )} */}

                        <Select>
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
        {/* :::::::::::::::::::::     TASK    :::::::::::::::::::: */}
      </Row>
      {/* <Navbar/> */}

      <Todo
        data={data}
        showModal={showModal}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </StyledContainer>
  );
};

export default Home2;
