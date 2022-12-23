import { GlobalOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import React from "react";

const Header = () => {
  return (
    <Row gutter={[24, 12]} className="row-wrapper-Header ">
      <Col className="gutter-row" lg={12} md={4} sm={2} xs={2}>
        <div className="content">
          <span>
            My Collections | <small> 8 Collections</small>
          </span>
        </div>
      </Col>
      <Col className="gutter-row" lg={2} md={12} sm={2} xs={2}>
        <div className="content">
          <GlobalOutlined />
        </div>
      </Col>
    </Row>
  );
};

export default Header;
