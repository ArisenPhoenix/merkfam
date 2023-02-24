import Blog from "../Components/Blog/Blog";
const dummy = [
  {
    _id: 320324820,
    author: "Brandon",
    body: "Hello",
    title: "Number 1",
    date: "01-01-2021",
  },
];
const BlogPage = (props) => {
  return <Blog blogs={dummy} />;
};

export default BlogPage;
