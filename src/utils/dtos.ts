export interface CreateStoryDto {
    title: string;
    description: string;
}

export interface UpdateStoryDto {
    title?: string;
    description?: string;
}

export interface RegisterUserDto {
    username: string;
    email: string;
    password: string;
}

export interface LoginUserDto {
    email: string;
    password: string;
}

export interface UpdateUserDto {
    username?: string;
    email?: string;
    password?: string;
}

export interface CreateCommentDto {
    text: string;
    storyId: number;
}

export interface UpdateCommentDto {
    text: string;
}