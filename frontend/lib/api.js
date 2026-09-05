const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch (_) {
    // no JSON body
  }

  if (!res.ok) {
    const message = data?.message || `Request failed with status ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    error.errors = data?.errors;
    throw error;
  }

  return data;
}

export const api = {
  registerCustomer: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  loginCustomer: (payload) => request('/auth/login/customer', { method: 'POST', body: payload }),
  loginAdmin: (payload) => request('/auth/login/admin', { method: 'POST', body: payload }),
  createAdmin: (payload, token) => request('/auth/admin', { method: 'POST', body: payload, token }),

  submitForm: (payload, token) => request('/forms', { method: 'POST', body: payload, token }),

  getSubmissions: (token, params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/admin/forms${query ? `?${query}` : ''}`, { token });
  },
  updateSubmission: (id, payload, token) =>
    request(`/admin/forms/${id}`, { method: 'PUT', body: payload, token }),
  deleteSubmission: (id, token) => request(`/admin/forms/${id}`, { method: 'DELETE', token }),
};
