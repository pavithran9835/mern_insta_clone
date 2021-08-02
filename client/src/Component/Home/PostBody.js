import React from "react";
import styled from "styled-components";
import Slider from "react-slick";

const PostBody = ({ post }) => {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", marginTop: "0px" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <PostBodyContainer>
      <Carousel {...settings}>
        {post.images.map((image, index) => (
          <img src={image.url} key={index} />
        ))}
      </Carousel>
    </PostBodyContainer>
  );
};

export default PostBody;

const PostBodyContainer = styled.div`
  width: 100%;
  max-height: 740px;
  overflow: hidden;

  @media (max-width: 1300px) {
    max-height: 680px;
  }
  @media (max-width: 1250px) {
    max-height: 650px;
  }
  @media (max-width: 1200px) {
    max-height: 600px;
  }
  @media (max-width: 1150px) {
    max-height: 600px;
  }
  @media (max-width: 1100px) {
    max-height: 600px;
  }
  @media (max-width: 1050px) {
    max-height: 600px;
  }
  @media (max-width: 1000px) {
    max-height: 650px;
  }
  @media (max-width: 1000px) {
    max-height: 600px;
  }
  @media (max-width: 900px) {
    max-height: 550px;
  }

  @media (max-width: 800px) {
    max-height: 530px;
  }

  @media (max-width: 700px) {
    max-height: 500px;
  }
`;

const Carousel = styled(Slider)`
  position: relative;
  margin-top: auto;
  margin-bottom: auto;

  & > button {
    opacity: 0;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }

  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
      margin-top: -90px;
    }
  }

  li.slick-active button:before {
    color: #000;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: 3% !important;
    z-index: 1;
    margin-top: -30px !important;
  }
  .slick-next {
    right: 3% !important;
    z-index: 1;
    margin-top: -30px !important;
  }
`;

const SliderImage = styled.div`
  width: auto;
  height: auto;
`;
