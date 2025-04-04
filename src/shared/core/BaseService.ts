// services/BaseService.ts
import axios, { AxiosResponse } from 'axios';

class BaseService {
  private baseUrl: string;
  private urlVersion: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.urlVersion = process.env.API_VERSION || 'v1';
  }

  // 1. Search (GET)
  async search(queryParams: object = {}): Promise<AxiosResponse> {
    try {
      const response = await axios.get(`/${this.urlVersion}/${this.baseUrl}/search`, {
        params: queryParams,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  // 2. Create (POST)
  async create(data: object): Promise<AxiosResponse> {
    try {
      const response = await axios.post(`/${this.urlVersion}/${this.baseUrl}/create`, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // 3. Update (PUT) by ID
  async update(id: string | number, data: object): Promise<AxiosResponse> {
    try {
      const response = await axios.put(`/${this.urlVersion}/${this.baseUrl}/update/${id}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // 4. Delete (DELETE) by ID
  async delete(id: string | number): Promise<AxiosResponse> {
    try {
      const response = await axios.delete(`/${this.urlVersion}/${this.baseUrl}/delete/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default BaseService;
