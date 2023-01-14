import { List, Row, Col } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { SubCard } from "./card";

interface item {
  id: number;
  name: string;
  path: string;
}

interface data {
  id: number;
  name: string;
  subs: item[];
}

export interface IProps {
  data: data;
}

export const SubList: React.FC<IProps> = (props) => {
  const { data } = props;

  return (
    <>
      <Row>
        <Col
          span={12}
          offset={1}
          style={{ textAlign: "start", paddingTop: "10px" }}
        >
          <h3>{data.name}</h3>
        </Col>
        <Col span={10} style={{ textAlign: "end", paddingTop: "15px" }}>
          <a href={"/category/" + data.id}>
            Бүгдийг үзэх <RightOutlined />
          </a>
        </Col>
      </Row>
      <Row>
        <Col span={22} offset={1}>
          <List
            grid={{
              gutter: 16,
              xs: 3,
              sm: 3,
              md: 4,
              lg: 5,
              xl: 5,
              xxl: 5,
            }}
            dataSource={data.subs}
            renderItem={(item) => (
              <List.Item>
                <SubCard id={item.id} name={item.name} image={item.path} />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};
