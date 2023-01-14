import { Card } from "antd";
const { Meta } = Card;

interface IProps {
  id: number;
  name: string;
  image: string;
}

export const SubCard: React.FC<IProps> = (props) => {
  const { id, name, image } = props;
  return (
    <a href={"/item/" + id}>
      <Card
        cover={
          <img
            alt={name}
            src={"http://localhost:3001/file/" + image}
            height={150}
          />
        }
        hoverable={true}
      >
        <Meta description={name} />
      </Card>
    </a>
  );
};
