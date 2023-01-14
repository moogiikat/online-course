import { AxiosInstance } from "axios";
import { Course } from "common/models/course.model";
import { BackendClient } from "common/services/backend_client";

export class CourseRepository {
  private static instance: CourseRepository;
  private constructor(
    protected readonly client: AxiosInstance = BackendClient.getInstance()
  ) {}

  static getInstance(): CourseRepository {
    if (!CourseRepository.instance) {
      CourseRepository.instance = new CourseRepository();
    }
    return this.instance;
  }

  get = async (id: string): Promise<Course> => {
    const url = "/course/" + id;
    const data = await this.client.get(url);
    return data.data;
  };

  getMany = async (): Promise<Course[]> => {
    const url = "/course";
    const response = await this.client.get(url);
    return response.data.map((item: { [key: string]: any }) =>
      Course.fromJson(item)
    );
  };

  //   getCandidates = async (id: string): Promise<Consideration> => {
  //     const url = `/consideration/${id}`;
  //     const response = await this.client.get(url);
  //     return Consideration.fromJson(response.data);
  //   };

  create = async (data: Course): Promise<Course> => {
    const url = "/course";
    const response = await this.client.post(url, data);
    return;
  };

  update = async (id: string, data: Course): Promise<Course> => {
    const url = `/course/${id}`;
    return await this.client.put(url, data);
  };

  delete = async (id: string): Promise<Course> => {
    const url = `/course/${id}`;
    return await this.client.delete(url);
  };

  //   updateCandidate = async (data: {
  //     Courses: number[];
  //     candidateIds: string[];
  //     companyId: string;
  //   }) => {
  //     const url = `/consideration/candidate/update`;
  //     return await this.client.put(url, data);
  //   };
}
