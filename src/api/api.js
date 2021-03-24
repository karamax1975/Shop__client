import ENDPOINTS from './endpoint';
const API_URL = 'api';


class Api {
  constructor(url, endpoint) {
    this.url = url;
    this.endpoint = endpoint;
  }

  async generateRequest(controller, endpoint, data) {
    const { method, uri } = this.endpoint[endpoint];
    if (method === 'GET') {
      return fetch(`${API_URL}${uri}`, {
        method,
        signal: controller.signal,
        body: data
      })
    }
    else if (uri === '/uploadPreview') {
      const formData = new FormData();
      formData.append('previewUrl', data, data.name);
      return fetch(`${API_URL}${uri}`, {
        method,
        signal: controller.signal,
        body: formData
      })
    }
    else {
      return fetch(`${API_URL}${uri}`, {
        method,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
      })
    }

  }
  async fetch(endpoint, data) {
    const ac = new AbortController;
    const response = await this.generateRequest(ac, endpoint, data);
    try {
      return await response.json();
    }
    catch (e) {
      ac.abort()
      console.log(e);
    }

  }
}
export default new Api(API_URL, ENDPOINTS)