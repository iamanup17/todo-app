import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import React from 'react';
import Icon from '../Icons/Icon';

// type CardProps = {
//   data: {
//     id: string;
//     title: string;
//     description: string;
//     url: string;
//     category: string;
//   }[];
//   icon: any;
//   handleDelete: (id: string) => void;
//   handleEdit: (id: string) => void;
// };

const Card = (props: any) => {
  const { data, icon, handleDelete, handleEdit } = props;
  return (
    <Row gutter={[12, 12]} className="row-wrapper">
      {data.length == 0 && <h5>No Tasks Available </h5>}
      {data.map((item: any) => {
        return (
          <Col
            key={item.id}
            className="gutter-row"
            lg={6}
            md={8}
            sm={12}
            xs={12}
          >
            <div className="content">
              <div>
                <Icon text={icon} />
                <span style={{ fontWeight: '500' }}>
                  {item?.title}
                  <small>{item?.description}</small>
                </span>
              </div>
              <Row>
                <Col span={2} offset={22}>
                  <span>
                    <EditOutlined
                      onClick={() => {
                        handleEdit(item.id);
                        // console.log(item)
                      }}
                      style={{ color: 'blue', fontSize: '1.1rem' }}
                    />
                  </span>
                  <span>
                    <DeleteOutlined
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                      style={{ color: 'red', fontSize: '1.1rem' }}
                    />
                  </span>
                </Col>
              </Row>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default Card;
