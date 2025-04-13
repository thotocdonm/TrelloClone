import { LoginResponse } from './../../types/auth.type';
import { AxiosResponse } from "axios";
import api from "../api";
import { BaseResponse } from "../../types/types";

class AuthService {
    private urlEndPoint:string;
    private urlVersion:string;

    constructor() {
        this.urlEndPoint = 'auth';
        this.urlVersion = process.env.API_VERSION || 'v1';
      }



    async login(email:string,password:string): Promise<BaseResponse<LoginResponse>> {
        try {
            const url =`/${this.urlVersion}/${this.urlEndPoint}/login/`;
            const response = await api.post(url, {
              email,password
            });
            return response.data;
          } catch (error) {
            console.log(error)
            throw error;
          }
    };
    
}

export default new AuthService()
