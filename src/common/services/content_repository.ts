import { AxiosInstance } from "axios";
import { Content } from "common/models/content.model";
import { Course } from "common/models/course.model";
import { BackendClient } from "common/services/backend_client";

export class ContentRepository {
  private static instance: ContentRepository;
  private constructor(
    protected readonly client: AxiosInstance = BackendClient.getInstance()
  ) {}

  static getInstance(): ContentRepository {
    if (!ContentRepository.instance) {
      ContentRepository.instance = new ContentRepository();
    }
    return this.instance;
  }

  get = async (id: string): Promise<Content> => {
    const url = `/content/${id}`;
    const data = await this.client.get(url);
    return data.data;
  };

  getMany = async (): Promise<Content[]> => {
    const url = "/course";
    const response = await this.client.get(url);
    return response.data.map((item: { [key: string]: any }) =>
      Course.fromJson(item.contents)
    );
  };

  //   getCandidates = async (id: string): Promise<Consideration> => {
  //     const url = `/consideration/${id}`;
  //     const response = await this.client.get(url);
  //     return Consideration.fromJson(response.data);
  //   };

  create = async (data: Content): Promise<Content> => {
    const url = "/content";
    const response = await this.client.post(url, data);
    return;
  };

  update = async (id: string, data: Content): Promise<Content> => {
    const url = `/content/${id}`;
    return await this.client.put(url, data);
  };

  delete = async (id: string): Promise<Content> => {
    const url = `/content/${id}`;
    return await this.client.delete(url);
  };

  //   updateCandidate = async (data: {
  //     Contents: number[];
  //     candidateIds: string[];
  //     companyId: string;
  //   }) => {
  //     const url = `/consideration/candidate/update`;
  //     return await this.client.put(url, data);
  //   };
}
