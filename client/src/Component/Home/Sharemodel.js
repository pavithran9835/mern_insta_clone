import React from "react";
import styled from "styled-components";
import {
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import {
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
const Sharemodel = ({ url }) => {
  return (
    <SharemodelContainer>
      <FacebookShareButton>
        <FacebookIcon
          size={32}
          round={true}
          style={{ marginLeft: "13px" }}
          url={url}
        />
      </FacebookShareButton>
      <LinkedinShareButton>
        <LinkedinIcon
          size={32}
          round={true}
          style={{ marginLeft: "13px" }}
          url={url}
        />
      </LinkedinShareButton>
      <PinterestShareButton>
        <PinterestIcon
          size={32}
          round={true}
          style={{ marginLeft: "13px" }}
          url={url}
        />
      </PinterestShareButton>
      <TelegramShareButton>
        <TelegramIcon
          size={32}
          round={true}
          style={{ marginLeft: "13px" }}
          url={url}
        />
      </TelegramShareButton>
      <TwitterShareButton>
        <TwitterIcon
          size={32}
          round={true}
          style={{ marginLeft: "13px" }}
          url={url}
        />
      </TwitterShareButton>
      <WhatsappShareButton>
        <WhatsappIcon
          size={32}
          round={true}
          style={{ marginLeft: "13px" }}
          url={url}
        />
      </WhatsappShareButton>
    </SharemodelContainer>
  );
};

export default Sharemodel;

const SharemodelContainer = styled.div`
  width: 99%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
