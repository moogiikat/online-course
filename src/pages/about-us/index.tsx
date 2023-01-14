import { Layout } from "antd";
import { appName } from "configs/default";
import { Header } from "layouts/header";
import { Footer } from "layouts/footer";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

const AboutUsPage: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{`【${appName}】`}</title>
      </Head>
      <Header />
      <div className="text-start py-10 px-5 lg:px-20 xl:px-40 2xl:px-40 pt-20">
        <div className="">
          <div className="py-2 px-2 lg:px-8">
            <h1 className="pt-1 text-2xl font-semibold">{"Бидний тухай"}</h1>
            <div className="py-4 indent-2 text-sm text-gray-600">
              {
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              }
            </div>
          </div>
          <div className="py-2 px-2 lg:px-8">
            <div className="pt-1 text-2xl font-semibold">
              {"Бидний санал болгож буй хичээлүүд"}
            </div>
            <div className="py-4 indent-2 text-sm text-gray-600">
              <p>
                • t is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point o
              </p>
              <p>
                • t is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point o
              </p>
              <p>
                • t is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point o
              </p>
              <p>
                • t is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point o
              </p>
              <p>
                • t is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point o
              </p>
            </div>
          </div>
        </div>
        <div className="pt-5 pb-8 text-center text-lg text-gray-600">
          Яг одоо идэвхитэй байгаа хичээлүүдийг
          <span>
            <a href="/course" className="text-blue-500 px-1">
              энд
            </a>
          </span>
          дарж үзнэ үү.
        </div>
        <div className="container mx-auto px-6">
          <section className="mb-10 text-center text-gray-800">
            <h2 className="mb-12 text-2xl font-bold">Манай баг</h2>

            <div className="grid gap-x-6 md:grid-cols-4 lg:gap-x-12">
              <div className="mb-6 lg:mb-0">
                <div className="block rounded-lg bg-white shadow-lg">
                  <div className="relative overflow-hidden bg-cover bg-no-repeat">
                    <img
                      src={
                        "https://w7.pngwing.com/pngs/466/902/png-transparent-business-man-drawing-cartoon-business-man-child-hand-people.png"
                      }
                      className="w-full rounded-t-lg"
                    />
                    <svg
                      className="absolute"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1440 320"
                      style={{ left: 0, bottom: 0 }}
                    >
                      <path
                        fill="#fff"
                        d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                      ></path>
                    </svg>
                  </div>
                  <div className="h-52 p-6">
                    <h5 className="mb-4 text-lg font-bold">Test A</h5>
                    <p className="mb-4 text-gray-500">
                      Үүсгэн байгуулагч, Гүйцэтгэх захирал
                    </p>
                    <ul className="mx-auto flex list-inside justify-center">
                      <a
                        href="https://www.facebook.com"
                        className="px-2"
                        target={"_blank"}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                          className="h-4 w-4 text-blue-600"
                        >
                          <path
                            fill="currentColor"
                            d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                          />
                        </svg>
                      </a>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="block rounded-lg bg-white shadow-lg">
                  <div className="relative overflow-hidden bg-cover bg-no-repeat">
                    <img
                      src={
                        "https://w7.pngwing.com/pngs/466/902/png-transparent-business-man-drawing-cartoon-business-man-child-hand-people.png"
                      }
                      className="w-full rounded-t-lg"
                    />
                    <svg
                      className="absolute"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1440 320"
                      style={{ left: 0, bottom: 0 }}
                    >
                      <path
                        fill="#fff"
                        d="M0,288L48,256C96,224,192,160,288,160C384,160,480,224,576,213.3C672,203,768,117,864,85.3C960,53,1056,75,1152,69.3C1248,64,1344,32,1392,16L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                      ></path>
                    </svg>
                  </div>
                  <div className="h-52 p-6">
                    <h5 className="mb-4 text-lg font-bold">Test B</h5>
                    <p className="mb-4 text-gray-500">
                      Бизнес хөгжил хариуцсан захирал
                    </p>
                    <ul className="mx-auto flex list-inside justify-center">
                      <a
                        href="https://www.facebook.com"
                        target={"_blank"}
                        className="px-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                          className="h-4 w-4 text-blue-600"
                        >
                          <path
                            fill="currentColor"
                            d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                          />
                        </svg>
                      </a>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutUsPage;
