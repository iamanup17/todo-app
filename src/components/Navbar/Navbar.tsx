import {
  AimOutlined,
  AppstoreOutlined,
  BankOutlined,
  BuildOutlined,
  HeatMapOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavbar = styled.div`
  background: #ffffff;
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .Logo {
    padding: 2px;

    .content {
      display: flex;
      justify-content: center;
    }
  }
  .nav-links {
    padding: 5px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Navbar = () => {
  return (
    <StyledNavbar>
      <Row gutter={12} className="Logo">
        <Col className="gutter-row" span={24}>
          <div className="content">
            <HeatMapOutlined style={{ fontSize: "2rem" }} />
          </div>
        </Col>
      </Row>

      <Row gutter={12} className=" Logo nav-links">
        <Col className="gutter-row" span={24}>
          <div className="content">
            <NavLink to="/" className="active">
              <AppstoreOutlined style={{ fontSize: "2rem" }} />
            </NavLink>
          </div>
        </Col>
        <Col className="gutter-row" span={24}>
          <div className="content">
            <NavLink to="/new">
              <AimOutlined style={{ fontSize: "2rem" }} />
            </NavLink>
          </div>
        </Col>
        <Col className="gutter-row" span={24}>
          <div className="content">
            <NavLink to="/new3">
              <BankOutlined style={{ fontSize: "2rem" }} />
            </NavLink>
          </div>
        </Col>
        <Col className="gutter-row" span={24}>
          <div className="content">
            <Link to="/new4">
              <BuildOutlined style={{ fontSize: "2rem" }} />
            </Link>
          </div>
        </Col>
      </Row>
      <Row gutter={12} className="Logo">
        <Col className="gutter-row" span={24}>
          <div className="content">
            <SettingOutlined style={{ fontSize: "2rem" }} />
          </div>
        </Col>
      </Row>
    </StyledNavbar>
  );
};

export default Navbar;
