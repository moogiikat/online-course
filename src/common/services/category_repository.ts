import { AxiosInstance, AxiosResponse } from "axios";
import { Category } from "common/models/category.model";
import { BackendClient } from "common/services/backend_client";

export class CategoryRepository {
  private static instance: CategoryRepository;
  private constructor(
    protected readonly client: AxiosInstance = BackendClient.getInstance()
  ) {}

  static getInstance(): CategoryRepository {
    if (!CategoryRepository.instance) {
      CategoryRepository.instance = new CategoryRepository();
    }
    return this.instance;
  }

  get = async (id: string): Promise<Category> => {
    const url = `/category/${id}`;
    const data = await this.client.get(url);
    return data.data;
  };

  getMany = async (): Promise<Category[]> => {
    const url = "/category";
    const response = await this.client.get(url);
    return response.data;
  };

  //   getCandidates = async (id: string): Promise<Consideration> => {
  //     const url = `/consideration/${id}`;
  //     const response = await this.client.get(url);
  //     return Consideration.fromJson(response.data);
  //   };

  create = async (data: Category): Promise<Category> => {
    const url = "/category";
    const response = await this.client.post(url, data);
    return;
  };

  update = async (id: string, data: Category): Promise<AxiosResponse> => {
    const url = `/category/${id}`;
    return await this.client.put(url, data);
  };

  delete = async (id: string): Promise<AxiosResponse> => {
    const url = `/category/${id}`;
    return await this.client.delete(url);
  };

  //   updateCandidate = async (data: {
  //     considerations: number[];
  //     candidateIds: string[];
  //     companyId: string;
  //   }) => {
  //     const url = `/consideration/candidate/update`;
  //     return await this.client.put(url, data);
  //   };
}
