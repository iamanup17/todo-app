// import {
//   DeleteOutlined,
//   DownOutlined,
//   EditOutlined,
//   GlobalOutlined,
// } from '@ant-design/icons';
// import { Col, Collapse, Row } from 'antd';
// import React, { ReactNode } from 'react';
// import { Button } from './Buttons/Button';
// import Card from './Cards/Card';
// import Icon from './Icons/Icon';

// const { Panel } = Collapse;

// // interface TodosProps {
// //   data: {
// //     category: string;
// //     icon: string;
// //     datas: {
// //       id: string;
// //       title: string;
// //       description: string;
// //       url: string;
// //       isCompleted: boolean;
// //     }[];
// //   }[];
// //   icon: React.ReactNode;
// //   defaultKey: boolean;
// //   handleDelete: (id: string) => void;
// //   handleEdit: (id: string) => void;
// // }

// const Todos2 = (props: any) => {
//   const { data, defaultKey, handleDelete, handleEdit, icon } = props;

//   // const { data, defaultKey } = props;
//   const Head = (
//     <span style={{ fontSize: '1.1rem', color: '#424242' }}> casdasd</span>
//   );

//   return (
//     <Row gutter={[3, 12]} className="row-wrapper row-wrapper-collapse">
//       <Col className="gutter-row" lg={24} md={24} sm={24} xs={24}>
//         <div className="content">
//           <Collapse
//             accordion
//             bordered={false}
//             expandIconPosition="end"
//             defaultActiveKey={defaultKey ? ['1'] : ''}
//           >
//             <Panel header={Head} key="1">
//               <Card
//                 data={data}
//                 icon={icon}
//                 handleDelete={handleDelete}
//                 handleEdit={handleEdit}
//               />
//             </Panel>
//           </Collapse>
//         </div>
//       </Col>
//     </Row>
//   );
// };

// export default Todos2;

import React from 'react';

const Todos2 = () => {
  return <div>Todos2</div>;
};

export default Todos2;
