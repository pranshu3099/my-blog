import Navbar from "@/components/navbar/layout";
import Category from "@/components/create/category";
import {
  useEffect,
  useState,
  useReducer,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/router";
import { ThemeContext } from "@/context/provider";
import EditorComponent from "@/components/editor/Editor";
import ShowImage from "@/components/create/showimage";
import axios from "axios";
import { AuthContext } from "@/context/authprovider";
const Create = () => {
  const blogReducer = (state, { type, payload }) => {
    switch (type) {
      case "title":
        return { ...state, ...payload };
      case "content":
        return { ...state, ...payload };
      default:
        return state;
    }
  };
  const [categories, setCatogries] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState(0);
  const [imageurl, setImageUrl] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const [blog, dispatch] = useReducer(blogReducer, {
    title: "",
    content: "",
  });

  const { bearer } = useContext(AuthContext);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let token = localStorage.getItem("Bearer");
      if (!token) {
        router.push("/login");
      }
    }
  }, [router.asPath]);

  const headers = useMemo(
    () => ({
      Authorization: `${bearer}`,
      "Content-Type": "application/json",
    }),
    [bearer]
  );

  const api_url = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    try {
      const getCategories = async () => {
        const response = await fetch(`${api_url}/getcategories`, {
          method: "GET",
        });
        const result = await response.json();
        if (response.ok) {
          setCatogries(result?.categories);
        } else {
          console.log("Error", result);
        }
      };
      getCategories();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile([...selectedFile, file]);
    let reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview([...imagePreview, reader.result]);
    };
    if (file) reader.readAsDataURL(file);
  };

  const copyTextToClipboard = (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };

  const handleGeturl = (e) => {
    let textToCopy = e.target.previousElementSibling.textContent;
    copyTextToClipboard(textToCopy);

    e.target.style.display = "none";
    e.target.nextElementSibling.style.display = "block";
    setTimeout(() => {
      e.target.style.display = "block";
      e.target.nextElementSibling.style.display = "none";
    }, 1000);
  };

  const handleRemovelist = useCallback(
    (base64_url, list_img, actual_url) => {
      let newfilearr = imagePreview.filter((img) => {
        if (img !== base64_url) return true;
        return false;
      });
      setImagePreview(newfilearr);
      let newimagearr = selectedFile.filter((img) => {
        if (img !== list_img) return true;
        return false;
      });
      setSelectedFile(newimagearr);

      if (actual_url !== "") {
        let newImageUrl = imageurl.filter((url) => {
          return url !== actual_url;
        });
        setImageUrl([...imageurl, ...newImageUrl]);
      }
    },
    [imageurl, selectedFile, imagePreview]
  );

  const uploadImages = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    selectedFile.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await fetch(`${api_url}/api/uploadimage`, {
        body: formData,
        method: "POST",
        credentials: "include",
      });
      const result = await response?.json();
      setImageUrl([...imageurl, ...result?.url]);
      setSelectedFile([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (blog.title === "" && blog.blogContent === "") {
      alert("please write your blog");
    }
    let randomNum = Math.floor(Math.random() * 9000) + 1000;
    let admin_data = JSON.parse(localStorage.getItem("admin_data"));
    let data = {
      title: blog?.title,
      content: blog?.blogContent,
      user_id: Number(admin_data?.id),
      category_id: Number(selectedCategorie),
      posts_id: Number(randomNum),
    };
    axios
      .post(`${api_url}/createposts`, data, { headers })
      .then((response) => {
        if (response.status === 200) {
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <form method="post" encType="multipart/form-data">
        <div className="h-screen w-full p-10 flex flex-col items-start gap-20">
          <Category
            categories={categories}
            setSelectedCategorie={setSelectedCategorie}
          />
          <input
            type="text"
            value={blog?.title}
            placeholder="blog title"
            className={`border-b-2 border-blue-600 w-[900px] border-t-0 border-l-0 border-r-0 focus:outline-none bg-transparent ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
            onChange={(e) => {
              dispatch({ type: "title", payload: { title: e.target.value } });
            }}
          />
          <div>
            <div className="flex items-center justify-center w-[900px] ">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2  rounded-lg cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  name="images"
                  multiple
                />
              </label>
            </div>
          </div>
          <div className="w-full">
            {
              <ShowImage
                list={selectedFile}
                removelist={handleRemovelist}
                imgurl={handleGeturl}
                preview={imagePreview}
                copyurl={imageurl}
              />
            }
          </div>
          <button
            onClick={uploadImages}
            type="submit"
            className="text-white w-[200px] hover:bg-blue-800 transition duration-300 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 text-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
          >
            Upload Images
          </button>{" "}
          <EditorComponent blog={blog} dispatch={dispatch} />
          <div>
            <button
              onClick={handleSubmit}
              type="button"
              className="text-white w-[200px] hover:bg-blue-800 transition duration-300 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 text-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
            >
              Create Blog
            </button>{" "}
          </div>
        </div>
      </form>
    </>
  );
};

export default Create;
