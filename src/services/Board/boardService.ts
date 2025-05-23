import { BoardResponse, WorkspaceResponse } from "../../types/auth.type";
import { BaseResponse } from "../../types/types";
import api from "../api";
import BaseService from "../BaseService";

class BoardService extends BaseService<BoardResponse> {
    constructor() {
        super('board');
    }

}

export default new BoardService()
