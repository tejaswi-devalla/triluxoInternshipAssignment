import Cookies from "js-cookie";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import "./index.css";

const Blog = () => {
  const [blogName, setBlogName] = useState("");
  const [data, setData] = useState([]);
  const [createBlog, setCreateBlog] = useState(false);
  const userId = Cookies.get("user_id");
  const navigate = useNavigate();

  useEffect(() => {
    const getUserID = Cookies.get("user_id");
    if (getUserID === undefined) {
      navigate("/");
    }
  });

  const handleChange = (content) => {
    const updateData = {
      id: uuid(),
      blogName,
      content,
    };
    setData((prevState) => [...prevState, updateData]);
  };

  const onClickCreateBlog = () => {
    setCreateBlog(true);
  };

  const onClickSubmitBtn = async (e) => {
    e.preventDefault();
    setCreateBlog(false);
    const sendId = `${userId}`;
    const curId = { data, sendId };
    const url = "http://localhost:8000/blog";
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userId}`,
      },
      body: JSON.stringify(curId),
    };
    const response = await fetch(url, options);
    const resData = await response.json();
    console.log(resData);
  };

  const onclickLogOut = () => {
    Cookies.remove("user_id");
    navigate("/");
  };

  return (
    <div className="blog-bg-color">
      {createBlog ? (
        <>
          <h1 className="blog-title">Blog Name</h1>
          <input
            value={blogName}
            type="text"
            className="blog-name"
            placeholder="Enter Blog Title"
            onChange={(event) => setBlogName(event.target.value)}
          />
          <form className="blog" onSubmit={onClickSubmitBtn}>
            <SunEditor
              placeholder="Enter Your Content"
              height="500"
              width="500"
              onChange={handleChange}
              setDefaultStyle="font-family: Roboto;font-size: 20px;color: #ffffff; border: solid 1px #000000; background-color: #000000;"
              setOptions={{
                buttonList: [
                  [
                    "bold",
                    "underline",
                    "italic",
                    "strike",
                    "list",
                    "align",
                    "fontSize",
                    "formatBlock",
                    "image",
                    "video",
                    "audio",
                  ],
                ],
              }}
            />
            <button type="submit" className="blog-submit">
              Submit
            </button>
          </form>
        </>
      ) : (
        <>
          <button
            type="button"
            className="create-bolg-btn"
            onClick={onClickCreateBlog}
          >
            Create Blog
          </button>
          <button type="button" className="logout" onClick={onclickLogOut}>
            Logout
          </button>
          <div className="yourblog">
            <div>{blogName}</div>
            {data.map((eachItem) => (
              <div
                key={eachItem.id}
                dangerouslySetInnerHTML={{
                  __html: eachItem.content,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default Blog;
