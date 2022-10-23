import service from "./index";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

// Get Routes

async function getAllData() {
  try {
    const res = await service.get("/post/get");

    const result = {
      status: res.status + "-" + res.statusText,
      headers: res.headers,
      data: res.data,
    };

    return result;

    // setBlogs(result.data);

    // console.log("==================================");
    // console.log(JSON.stringify(result, null, 2));
    // console.log("==================================");
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }
}

async function getOneData(slug) {
  try {
    const res = await service.get(`/post/get/${slug}`);

    const result = {
      status: res.status + "-" + res.statusText,
      headers: res.headers,
      data: res.data,
    };

    return result;

    // setBlogs(result.data);

    console.log("==================================");
    console.log(JSON.stringify(result, null, 2));
    console.log("==================================");
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }
}

// Post Routes

async function createPost(data) {
  try {
    /**
     * @param {Object} data
     * @param {String} data.title
     * @param {String} data.content
     * @param {String} data.email
     * @param {String} data.summary
     * @param {Boolean} data.isEdited
     * @param {String} data.slug
     * @param {File} data.mainImage
     * @param {String} data.alt
     * @param {String} data.original
     * @param {String} data.caption
     * @param {Array} data.tags
     */

    // const res = await service.post("/post/submit", data);
    const res = await axios({
      method: "post",
      url: `${BASE_URL}/post/submit`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });

    const result = {
      status: res.status + "-" + res.statusText,
      headers: res.headers,
      data: res.data,
    };
    // setBlogs(result.data);

    console.log("==================================");
    console.log(JSON.stringify(result, null, 2));
    console.log("==================================");

    return result;
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }
}

async function searchPosts(query) {
  try {
    const res = await service.post(`/post/search/${query}`);

    const result = {
      status: res.status + "-" + res.statusText,
      headers: res.headers,
      data: res.data,
    };
    // setBlogs(result.data);

    console.log("==================================");
    console.log(JSON.stringify(result, null, 2));
    console.log("==================================");

    return result;
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }
}

export { getAllData, getOneData, createPost, searchPosts };
