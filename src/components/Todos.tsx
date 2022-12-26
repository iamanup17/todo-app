import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { Col, Collapse, Row } from "antd";
import React from "react";
import { Button } from "./Buttons/Button";

const { Panel } = Collapse;

interface TodosProps {
  data: {
    title: string;
    description: string;
    url: string;
  }[];
  category: string;
  defaultKey: boolean;
  handleDelete : (taskName : string)=>void;
  handleEdit : (taskName : string)=>void;
}

const Todos = (props: TodosProps) => {
  const { data, category, defaultKey , handleDelete , handleEdit} = props;
  const Head = <span style={{ color: "#1a1818" }}> {category}</span>;

  // console.log(data)
  return (
    <Row gutter={[3, 12]} className="row-wrapper row-wrapper-collapse">
      <Col className="gutter-row" lg={24} md={24} sm={24} xs={24}>
        <div className="content">
          <Collapse
            accordion
            bordered={false}
            expandIconPosition="end"
            defaultActiveKey={defaultKey ? ["1"] : ""}
          >
            <Panel header={Head} key="1">
              <Row gutter={[12, 12]} className="row-wrapper">
                {data.length == 0 && <h2>No Tasks Available </h2>}
                {data.map((item, index) => {
                  // console.log(item) 
                  return (
                    <Col
                      key={index}
                      className="gutter-row"
                      lg={6}
                      md={6}
                      sm={6}
                      xs={6}
                    >
                      <div className="content">
                        {" "}
                        <div>
                          <GlobalOutlined
                            style={{
                              fontSize: "1.4rem",
                              margin: "4px 2px 0px 5px",
                              color: "#99efd5",
                            }}
                          />
                          <span>
                            {item?.title}
                            <small>
                              {item?.description}
                            </small>
                          </span>
                        </div>
                        <Row>
                          <Col span={2} offset={22}>
                            <span>
                              <EditOutlined
                              onClick={() => { 
                                handleEdit(item.title)
                                // console.log(item)
                               }}
                                style={{ color: "blue", fontSize: "1.1rem" }}
                              />
                            </span>
                            <span>
                              <DeleteOutlined 
                              onClick={() => { 
                                handleDelete(item.title)
                               }}
                                style={{ color: "red", fontSize: "1.1rem" }}
                              />
                            </span>
                          </Col>
                        </Row>
                        {/* <div>
                          <Button text="Edit" />
                          <Button text="Delete" />
                        </div> */}
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Panel>
          </Collapse>
        </div>
      </Col>
    </Row>
  );
};

export default Todos;
