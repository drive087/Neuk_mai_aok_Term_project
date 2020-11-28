import axios from "axios";

// Get All Job
export const getAllJob = (post) => {
  const job = axios
    .get(`/jobs`, {
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

// GetMyJob
export const getmyJobs = () => {
  const api = axios
    .get(`/jobs/myjobs`, {
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

// Approve People
export const approvePeople = (body) => {
  const api = axios
    .post(`/jobs/approve`, body, {
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

// GetJobByID
export const getJobByID = (id) => {
  const api = axios
    .get(`/jobs/getJobById/${id}`, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .then((err) => {
      console.log(err);
      return err;
    });
  return api;
};

// EditJob
export const editJob = (job, id) => {
  const api = axios
    .patch(`/jobs/updateJob/${id}`, job, {
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

// DeleteJobByID
export const deleteJobByID = (jobId) => {
  const api = axios
    .post(`/jobs/deleteJob`, jobId, {
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

// JobDone
export const doneJob = (jobId) => {
  const api = axios
    .post(`/jobs/finish`, jobId, {
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

// RejectPeople
export const rejectJob = (body) => {
  const api = axios
    .post(`/jobs/rejectJob`, body, {
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
