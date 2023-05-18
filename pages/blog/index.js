import Blog from "../../Components/Blog/Blog";
import AUTH_GUARD from "../../Merkurial/Auth/AUTH";
const dummy = [
  {
    _id: 320324820,
    author: "Brandon",
    body: "Hello",
    title: "Number 1",
    date: "01-01-2021",
  },
  {
    _id: 320324821,
    author: "Alina",
    body: "Hello",
    title: "Number 2",
    date: "01-01-2021",
  },
];

const BlogPage = (props) => {
  return (
    <AUTH_GUARD needsLoggedIn={true}>
      <Blog blogs={dummy} />
    </AUTH_GUARD>
  );
};

export default BlogPage;