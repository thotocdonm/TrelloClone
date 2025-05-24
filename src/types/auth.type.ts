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