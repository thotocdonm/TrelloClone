export type LoginResponse = {
    access: string;
    refresh: string;
}

export type RegisterResponse = {
    phone_number: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
}

export type WorkspaceResponse = {
    user: number;
    workspace: {
        id: number;
        name: string;
        description: string | null;
    };
    role: string;
};

interface Card {
    id: number;
    name: string;
    description: string | null;
    file: string | null;
    label: string | null;
    start_date: string | null;
    end_date: string | null;
    list: number;
    tasks: Task | null;
}

interface List {
    id: number;
    name: string;
    board: number;
    listcard: Card[];
}

export interface BoardResponse {
    id: number;
    name: string;
    background_color: string;
    boardlists: List[];
}

export type Task = {
    task: string;
    status: number;
};

export type CardResponse = {
    id: number;
    index: number;
    name: string;
    description: string;
    file: string;
    label: string;
    start_date: string;
    end_date: string;
    tasks: Task[];
    listCard: number;
};
