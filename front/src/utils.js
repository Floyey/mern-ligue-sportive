export const getErrorFromBackend = (error) => {
  return error.response && error.response.data.error
    ? error.response.data.error
    : error.message;
};

export const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
