import http from "../http-common";

const getAll = () => {
  return http.get("/supplier");
};

const get = (id) => {
  return http.get(`/supplier/${id}`);
};

const create = (data) => {
  return http.post("/supplier", data);
};

const update = (id, data) => {
  return http.put(`/supplier/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/supplier/${id}`);
};

const removeAll = () => {
  return http.delete(`/supplier`);
};

const findByTitle = (title) => {
  return http.get(`/supplier?title=${title}`);
};

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default TutorialService;
