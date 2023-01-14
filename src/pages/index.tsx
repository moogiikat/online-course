import { Layout, Carousel, Image, Card, Row, Col } from "antd";
import { appName, backend } from "configs/default";
import { Header } from "layouts/header";
import { Footer } from "layouts/footer";
import Head from "next/head";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import useGet from "./hooks";
import { useRouter } from "next/router";
const { Content } = Layout;

const HomePage: React.FC = () => {
  const router = useRouter();

  const { data: categories, isLoading, error } = useGet();
  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },

    540: {
      slidesPerView: 1,
      spaceBetween: 20,
    },

    820: {
      slidesPerView: 3,
      spaceBetween: 20,
    },

    1200: {
      slidesPerView: 3,
      spaceBetween: 20,
    },

    1280: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
    1800: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
    2600: {
      slidesPerView: 5,
      spaceBetween: 40,
    },
  };

  const { Meta } = Card;
  return (
    <>
      <Head>
        <title>{`【${appName}】`}</title>
      </Head>
      <Header />
      <Carousel autoplay>
        <Image
          preview={false}
          width="100%"
          height={"700px"}
          src={"/assets/login.jpeg"}
          key={"/assets/login.jpeg"}
        />
        <Image
          preview={false}
          width="100%"
          height={"700px"}
          src={"/assets/login.jpeg"}
          key={"/assets/login.jpeg"}
        />
      </Carousel>

      <Row className="px-10 justify-center py-4">
        <Col xs={22} sm={18} md={20}>
          {!isLoading &&
            categories?.map((item) => {
              return (
                <div className="py-4">
                  <p className="text-2xl py-4">{item.name}</p>
                  <Swiper
                    // slidesPerView={3}
                    spaceBetween={30}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                    breakpoints={breakpoints}
                  >
                    {item.courses.map((child) => {
                      console.log(child);
                      return (
                        <SwiperSlide>
                          <Card
                            hoverable
                            // style={{ width: 240 }}
                            cover={
                              <img
                                alt="example"
                                src={
                                  // child.imagePath ? backend.baseUrl +
                                  // "/file?img=" +
                                  // child.imagePath :
                                  "/assets/no-image.png"
                                }
                                style={{
                                  width: "100%",
                                  height: "180px",
                                  borderRadius: 4,
                                }}
                              />
                            }
                            onClick={() => router.push("/course/" + child.id)}
                          >
                            <a>
                              <Meta title={child.name} />
                            </a>
                          </Card>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              );
            })}
        </Col>
      </Row>
      {/* <Content className="px-12">
          {categories?.map((item) => {
            return <SubList data={item} key={item.id} />;
          })}
        </Content> */}
      <Footer />
    </>
  );
};

export default HomePage;
