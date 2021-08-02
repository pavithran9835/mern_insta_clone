import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const LikeButton = ({ isLike, likeChangeHandler, unlikeChangeHandler }) => {
  return (
    <>
      {isLike ? (
        <FavoriteIcon onClick={unlikeChangeHandler} style={{ color: "red" }} />
      ) : (
        <FavoriteBorderIcon onClick={likeChangeHandler} />
      )}
    </>
  );
};

export default LikeButton;
