import axios from "axios";

const url = "https://e-commerce-5i4j.onrender.com/";

let userUrl = axios.create({
  baseURL: url,
});

export default userUrl;
