import axios from "axios";

export const axiosUtil = async (optionsRequest) => {
  return await axios.request(optionsRequest).then((res) => res.data);
};
