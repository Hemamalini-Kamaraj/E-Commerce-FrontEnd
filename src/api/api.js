import axios from "axios";

const url = "http://localhost:3001/";

let userUrl = axios.create({
  baseURL: url,
});

export default userUrl;
