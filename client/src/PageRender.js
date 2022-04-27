import React from "react";
import { useParams } from "react-router-dom"; //useparam을 이용해서 페이지를 가져온다.
import NotFound from "./components/NotFound";

const generatePage = (pageNum) => {
  //pageNum을 요구한다.
  const component = () => require(`./pages/${pageNum}`).default;

  try {
    //페이지가 있으면 component만들고
    return React.createElement(component());
  } catch (err) {
    //없는 페이지면 Not Found가 뜨도록 설정한다.
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, id } = useParams();
  let pageNum = "";
  if (id) {
    //만약 아이디가 있으면
    pageNum = `${page}/[id]`;
  } else {
    //만약 아이디가 없이 page만 있으면
    pageNum = `${page}`;
  }
  return generatePage(pageNum);
};

export default PageRender;
