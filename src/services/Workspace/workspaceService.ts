import { WorkspaceResponse } from "../../types/auth.type";
import { BaseResponse } from "../../types/types";
import api from "../api";
import BaseService from "../BaseService";

class WorkspaceService extends BaseService<WorkspaceResponse> {
    constructor() {
        super('workspace');
    }

}

export default new WorkspaceService()
