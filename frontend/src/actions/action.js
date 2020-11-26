import { API_HOST } from "../const";
import axios from "axios";

// Get All Job
export const getAllJob = (post) => {
  const job = axios
    .get(`${API_HOST}/jobs`, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((err) => console.log(err));
  return job;
};

// ApplyJob
export const applyJob = (_id) => {
  const status = axios
    .post(
      "/jobs/apply",
      { _id: _id },
      {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        // window.location.reload();
        return 200;
      }
    })
    .catch((err) => {
      return 400;
    });
  return status;
};

// CreateJob
export const createJob = (job) => {
  const api = axios
    .post("/jobs/create", job, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
  return api;
};

// axios
// .post("/jobs/create", data, {
//   headers: { Authorization: `${localStorage.getItem("token")}` },
// })
// .then((res) => {
//   if (res.status === 200) {
//     props.history.push({
//       pathname: "/",
//     });
//     window.location.reload();
//   }
// });