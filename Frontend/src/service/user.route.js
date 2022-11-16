import service from "./index";
import axios from "axios";

const BASE_URL = "http://65.0.108.6:1337/";

// Get Routes

// async function getAllData() {
//   try {
//     const res = await service.get("/post/get");

//     const result = {
//       status: res.status + "-" + res.statusText,
//       headers: res.headers,
//       data: res.data,
//     };

//     return result;

//     // setBlogs(result.data);

//     // console.log("==================================");
//     // console.log(JSON.stringify(result, null, 2));
//     // console.log("==================================");
//   } catch (err) {
//     console.log(JSON.stringify(err, null, 2));
//   }
// }

// async function getOnePost(slug) {
//   try {
//     const res = await service.get(`/post/get/${slug}`);

//     const result = {
//       status: res.status + "-" + res.statusText,
//       headers: res.headers,
//       data: res.data,
//     };

//     return result;

//     // setBlogs(result.data);

//     console.log("==================================");
//     console.log(JSON.stringify(result, null, 2));
//     console.log("==================================");
//   } catch (err) {
//     console.log(JSON.stringify(err, null, 2));
//   }
// }
//

// Post Routes

async function createUser(data) {
	try {
		/**
		 * @param {Object} data
		 * @param {String} data.email
		 * @param {String} data.image
		 * @param {String} data.name
		 * @param {String} data.bio
		 */

		// const res = await service.post("/post/submit", data);
		const res = await axios({
			method: "post",
			url: `${BASE_URL}/user/signup`,
			data: data,
			headers: { "Content-Type": "application/json" },
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

export { createUser, searchPosts };
