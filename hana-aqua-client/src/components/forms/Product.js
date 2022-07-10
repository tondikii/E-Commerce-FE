import Swal from "sweetalert2";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useCallback, useEffect, useState } from "react";
import apiInstance from "../../configs/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading, setError } from "../../store/reducers/root";
import htmlToDraft from "html-to-draftjs";
import { currencyMask, formatNumber } from "../../helpers/mask";

export default function ProductForm({ title, id, product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log({ product });
  const [productForm, setProductForm] = useState({
    name: product ? product.name : "",
    image: "",
    description: EditorState.createEmpty(),
    html: product ? product.description : "",
    price: product ? formatNumber(product.price.toString()) : "",
    CategoryId: product ? product.CategoryId : 0,
  });
  const [completed, setCompleted] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (product) {
      const contentBlock = htmlToDraft(product.description);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setProductForm({ ...productForm, description: editorState });
    }
  }, []);

  useEffect(() => {
    if (
      productForm.name &&
      productForm.html &&
      // productForm.stock > 0 &&
      Number(productForm.price.split(",").join("")) > 0 &&
      productForm.CategoryId
    ) {
      if (!product) {
        if (productForm.image) setCompleted(true);
      } else {
        setCompleted(true);
      }
    } else {
      setCompleted(false);
    }
  }, [productForm]);

  const changeValue = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

  const changeValueFile = (e) => {
      const maxSize = 1 * 1024 * 1024;
      const file = e.target.files[0];
      if (file.size > maxSize) {
        Swal.fire({
          icon: "error",
          title: "File Size",
          text: "Maximum file size is 1mb!",
        });
      } else {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        setPreview(reader);
        setProductForm({ ...productForm, [e.target.name]: file });
      }
    }
  const descriptionChange = (editorState) => {
    setProductForm((prev) => ({
      ...prev,
      description: editorState,
      html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    }));
  };
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("name", productForm.name);
      if (productForm.image) formData.append("file", productForm.image);
      formData.append("description", productForm.html);
      // formData.append("stock", productForm.stock);
      formData.append("price", Number(productForm.price.split(",").join("")));
      formData.append("CategoryId", productForm.CategoryId);
      let data;
      if (id) {
        const { data: update } = await apiInstance.put(
          `/products/update/${id}`,
          formData,
          {
            headers: { access_token: localStorage.access_token },
          }
        );
        data = update;
      }
      if (!id) {
        const { data: create } = await apiInstance.post(
          "/products/create",
          formData,
          {
            headers: { access_token: localStorage.access_token },
          }
        );
        data = create;
      }
      if (data.id) {
        navigate("/");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "success",
          title: `${
            id ? "Update Product " + id : "Create Product"
          } Successfully`,
        });
      }
    } catch (err) {
      dispatch(setError("Error Create Product"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="p-10 pl-72 w-full justify-center items-center">
      <h1 className=" text-5xl font-semibold text-blue-900 font-sans text-center">
        {title}
      </h1>

      <form className="mt-4">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className=" text-lg font-semibold text-blue-900"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="relative w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-blue-900 "
              placeholder="Name"
              defaultValue={productForm.name}
              onChange={(e) => changeValue(e)}
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className=" text-lg font-semibold text-blue-900"
            >
              Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              required
              className=" relative w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-blue-900 "
              placeholder="Image"
              onChange={(e) => changeValueFile(e)}
            />
            {preview.result ? (
              <img src={preview.result} className="w-48 h-48 mt-4" />
            ) : (
              product && (
                <img src={product.imageURL} className="w-48 h-48 mt-4" />
              )
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className=" text-lg font-semibold text-blue-900"
            >
              Description
            </label>
            <Editor
              editorState={productForm.description}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={descriptionChange}
              editorStyle={{
                width: "full",
                height: 300,
                borderWidth: 2,
                borderRadius: 6,
              }}
            />
          </div>

          <div>
            <label
              htmlFor="product-category"
              className=" text-lg font-semibold text-blue-900"
            >
              Category
            </label>
            <select
              id="product-category"
              name="CategoryId"
              required
              className=" relative w-full px-3 py-2 border-2 border-gray-300 text-gray-900 rounded-md focus:outline-none focus:border-blue-900 bg-white "
              placeholder="Select Category"
              onChange={(e) => changeValue(e)}
            >
              {!product && (
                <option disabled selected>
                  Select category
                </option>
              )}
              <option
                value={1}
                selected={productForm.CategoryId === 1 ? true : false}
              >
                Tanks
              </option>
              <option
                value={2}
                selected={productForm.CategoryId === 2 ? true : false}
              >
                Ponds
              </option>
            </select>
          </div>

          {/* <div>
            <label
              htmlFor="stock"
              className=" text-lg font-semibold text-blue-900"
            >
              Stock
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              required
              className=" relative w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-blue-900 "
              placeholder="Stock"
              defaultValue={productForm.stock}
              onChange={(e) => changeValue(e)}
            />
          </div> */}

          <div>
            <label
              htmlFor="price"
              className=" text-lg font-semibold text-blue-900"
            >
              Price
            </label>
            <div className="flex flex-row">
              <div className="px-3 py-2 border-2 border-gray-300 rounded-l-md border-r-0">
                <span>RP</span>
              </div>
              <input
                id="price"
                name="price"
                type="text"
                required
                className=" relative w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-r-md focus:outline-none focus:border-blue-900 "
                placeholder="100,000"
                value={productForm.price}
                onChange={(e) => changeValue(currencyMask(e))}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="relative w-full flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md border-white bg-blue-900 text-white text-center mt-8"
          style={{ opacity: completed ? 1 : 0.5 }}
          onClick={onSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
