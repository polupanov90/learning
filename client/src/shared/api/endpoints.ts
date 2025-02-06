import axios from "axios";

export const endpoints = axios.create({
    baseURL: 'http://localhost:4000/',
    timeout: 1000,
});
export type BaseTheme = {
    name: string,
}


export type Theme = BaseTheme & {
    _id?: string | null,
    id?: string | null,
    questions: Question[],
}

export type Answer = string;

export type BaseQuestion = {
    answer: Answer,
    question: string,
}

export type Question = BaseQuestion & {
    themeId: string,
    _id?: string | null
    id?: string | null,

}

export const createTheme = (data: BaseTheme) => endpoints.post('/themes', data);
export const getThemeList = () => endpoints.get('/themes').then(({ data }) => data as Theme[]);
export const editTheme = (data: Theme) =>  endpoints.put('/themes', data);
export const deleteTheme = (id: string) =>  endpoints.delete(`/themes`,  {data: {id}});

export const getTheme = (id: string) => endpoints.get(`/themes/${id}`).then(({ data }) => data as Theme)


export const createQuestion = ({ themeId, question }:{
    themeId: string,
    question: BaseQuestion
}) => endpoints.post(`/questions`, {
    ...question,
    themeId
});
export const deleteQuestion = (id: string) =>  endpoints.delete(`/questions`,  {data: {id}});