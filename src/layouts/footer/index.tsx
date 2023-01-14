import { Col, Divider, Layout, Row } from "antd";
import {
  MailIcon,
  LocationMarkerIcon,
  PhoneIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useSession } from "common/recoil";
import * as socialIcons from "common/icons/social";
import Image from "next/image";
const { Footer: FooterLayout } = Layout;

export const Footer: React.FC = () => {
  const router = useRouter();
  const { session, setSession } = useSession();

  return (
    <FooterLayout style={{ textAlign: "center", backgroundColor: "white" }}>
      <Divider />
      <Row className="justify-center my-10">
        <Col md={8}>
          <div className="my-2.5">
            <Image
              src={"/assets/logo/logo.png"}
              width={40}
              height={40}
              className={`cursor-pointer`}
            />
          </div>

          <div className="flex gap-x-4 justify-center">
            <a href="https://www.facebook.com" target="_blank">
              <socialIcons.FacebookIcon className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com" target="_blank">
              <socialIcons.InstagramIcon className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com" target="_blank">
              <socialIcons.TwitterIcon className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com" target="_blank">
              <socialIcons.LinkedinIcon className="h-5 w-5" />
            </a>
          </div>
          <p className="py-4">©2022 Created by Munkh</p>
        </Col>
        <Col md={8}>
          <div className="flex flex-col pt-2">
            <div className="flex py-2">
              <div className="pr-2">
                <LocationMarkerIcon width={18} />
              </div>
              <span className="text-sm text-heading w-56 text-left">
                Munkh's Building 94 тоот, Баянзүрх дүүрэг, 16 -р хороо,
                Улаанбаатар хот
              </span>
            </div>
            <div className="flex py-2">
              <div className="pr-2">
                <MailIcon width={18} />
              </div>
              <span className="text-sm text-heading">monkhoo1997ts@gmail.com</span>
            </div>
            <div className="flex py-2">
              <div className="pr-2">
                <PhoneIcon width={18} />
              </div>
              <span className="text-sm text-heading">+976 86246116</span>
            </div>
          </div>
        </Col>
      </Row>
    </FooterLayout>
  );
};
