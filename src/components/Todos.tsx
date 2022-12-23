import { DownOutlined, GlobalOutlined } from "@ant-design/icons";
import { Col, Collapse, Row } from "antd";
import React from "react";

const { Panel } = Collapse;

interface TodosProps {
  data: {
    title: string;
    description: string;
    url: string;
  }[];
  category:string;
  defaultKey: boolean
}

const Todos = (props: TodosProps) => {
  const { data,category,defaultKey } = props;
  const Head = (
    <span style={{ color: "white" }}>
      {" "}
      {category} <DownOutlined />
    </span>
  );
  return (
    <Row gutter={[3, 12]} className="row-wrapper row-wrapper-collapse">
      <Col className="gutter-row" lg={24} md={3} sm={2} xs={2}>
        <div className="content">
          <Collapse accordion bordered={false} defaultActiveKey={defaultKey ? ["1"] : ""}>
            <Panel header={Head} key="1">
              <Row gutter={[12, 12]} className="row-wrapper">
                {data.length == 0 && <h2>No Tasks Available </h2>}
                {data?.map((item, index) => {
                  return (
                    <Col
                      key={index}
                      className="gutter-row"
                      lg={6}
                      md={3}
                      sm={2}
                      xs={2}
                    >
                      <div className="content">
                        {" "}
                        <GlobalOutlined /> {item.title}{" "}
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
