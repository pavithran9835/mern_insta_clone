import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../../Component/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "../../helper";
import { explorePostAction } from "../../Redux/Action/post.action";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

const Explore = () => {
  const token = getCookie("token");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(explorePostAction(token));
  }, [dispatch]);

  const { explorePost } = useSelector((state) => state.explorePost);

  return (
    <>
      <Header />
      <ExploreContainer>
        <ExploreRow>
          {explorePost &&
            explorePost.map((explore, index) => (
              <ExploreBox
                key={index}
                style={{
                  backgroundImage: `url(${explore.images[0].url})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <PostDetails>
                  <Options>
                    <p>{explore.likes.length}</p>
                    <FavoriteIcon />
                  </Options>

                  <Options>
                    <p>
                      {explore.comments.length} <i class="fas fa-comment"></i>
                    </p>
                  </Options>
                </PostDetails>
              </ExploreBox>
            ))}
        </ExploreRow>
      </ExploreContainer>
    </>
  );
};

export default Explore;

const ExploreContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
`;

const ExploreRow = styled.div`
  width: 65%;
  height: auto;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const ExploreBox = styled.div`
  width: 290px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const PostDetails = styled.div`
  width: 100%;
  height: 100%;
  background-color: #00000070;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  opacity: 0;
  cursor: pointer;

  p {
    color: #aaa;
    margin-right: 5px;
  }

  .MuiSvgIcon-root {
    color: #aaa;
  }

  i {
    color: #aaa;
    font-size: 20px;
    margin-left: 5px;
  }

  &:hover {
    opacity: 1;
  }
`;

const Options = styled.div`
  display: flex;
`;
