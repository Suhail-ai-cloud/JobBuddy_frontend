import { API } from "./api"; // reuse your axios instance

// Get all portfolios for a worker
export const getWorkerPortfolio = async (workerId) => {
  const res = await API.get(`/worker-portfolios/?worker=${workerId}`);
  return res.data.results; // return results array
};

// Create a portfolio
export const createPortfolio = async (data) => {
  const res = await API.post("/worker-portfolios/", data);
  return res.data;
};

// Update a portfolio
export const updatePortfolio = async (id, data) => {
  const res = await API.put(`/worker-portfolios/${id}/`, data);
  return res.data;
};

// Delete a portfolio
export const deletePortfolio = async (id) => {
  const res = await API.delete(`/worker-portfolios/${id}/`);
  return res.data;
};

// Add media to a portfolio
export const addPortfolioMedia = async (portfolioId, formData) => {
  const res = await API.post(`/worker-portfolios/${portfolioId}/add_media/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Delete a media file from a portfolio
export const deletePortfolioMedia = async (portfolioId, mediaId) => {
  const res = await API.delete(`/worker-portfolios/${portfolioId}/delete-media/${mediaId}/`);
  return res.data;
};

// Get comments for a portfolio
export const getWorkerComments = async (portfolioId) => {
  const res = await API.get(`/worker-comments/?portfolio=${portfolioId}`);
  return res.data.results;
};
