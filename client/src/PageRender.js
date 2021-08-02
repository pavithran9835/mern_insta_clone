import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "./Component/NotFound.js";

const generatePage = (pageName) => {
  const component = () => require(`./pages/${pageName}`).default;

  try {
    return React.createElement(component());
  } catch (err) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, id } = useParams();
  console.log(page, id);

  let pageName = "";

  if(id) {
    pageName = `${page}/[id]`;
  } else {
    pageName = `${page}`;
  }

  console.log(pageName);

  return generatePage(pageName);
};

export default PageRender;
