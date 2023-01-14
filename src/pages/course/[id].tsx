import { Col, Typography, Row, Divider } from "antd";
import { appName } from "configs/default";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useGet from "./hooks";
import Vimeo from "@u-wave/react-vimeo";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Header } from "layouts/header";

const { Title } = Typography;

const CoursePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, error } = useGet(id ? (id as string) : "");
  const [video, setVideo] = useState<{ title: string; serial: number }>({
    title: data?.name,
    serial: 563709057,
  });

  function playCourse(id: number) {
    //TODO: check video and license backend side
    setVideo({
      title: "ba",
      serial: 1,
    });
  }

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      <Head>
        <title>{`${data?.name} -【${appName}】`}</title>
      </Head>
      <Header />
      <Row justify="center" className="pt-24">
        <Col xs={22} sm={18} md={18} lg={12} xl={12} className="">
          {/* FIXME: vimeo төлбөртэй хувилбөр авсаны дараа шалгах */}
          <Vimeo
            video={video.serial}
            autoplay
            controls={false}
            showTitle={false}
            responsive={true}
            pip={false}
          />
          <Title level={4} className="pt-4">
            {video.title}
          </Title>
          <Divider />
          <p>{data?.description}</p>
        </Col>
        <Col xs={20} sm={18} md={18} lg={6} xl={6} className="px-4">
          <div>
            <Divider orientation="left" plain>
              <Title level={5}>Хичээлүүд</Title>
            </Divider>
          </div>
          <CourseListItem
            id={0}
            title="Танилцуулга"
            onClick={() => playCourse(0)}
          />
          {data?.contents.map((content) => {
            return (
              <CourseListItem
                id={content.id}
                title={content.name}
                onClick={() => playCourse(content.id)}
              />
            );
          })}
        </Col>
      </Row>
    </>
  );
};

interface IProps {
  id: number;
  title: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const CourseListItem: React.FC<IProps> = ({ id, title, onClick }) => {
  return (
    <span onClick={onClick}>
      <div className="border-dotted border-[1px] border-indigo-600 rounded px-2 py-2 mt-3 hover:bg-slate-200 cursor-pointer content-center w-full">
        <PlayCircleOutlined className="pr-2" /> {title}
      </div>
    </span>
  );
};

export default CoursePage;
