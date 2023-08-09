import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const RichTextEditor = ({ handleContentChange }) => {
  const [editorHtml, setEditorHtml] = useState("");

  const handleChange = (html) => {
    setEditorHtml(html);
    handleContentChange(html); // Notify parent component about content change
  };

  const handleImageUpload = (file) => {
    // Simulate uploading the file and return the URL
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("https://example.com/uploads/" + file.name);
      }, 1000);
    });
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "video"],
        ["clean"],
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
    "video",
  ];

  return (
    <div>
      <ReactQuill
        value={editorHtml}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default RichTextEditor;
