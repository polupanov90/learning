import {createEffect} from "effector/compat";
import {BaseQuestion, createQuestion} from "../../../shared/api";

export const createQuestionFx = createEffect((payload: {
    themeId: string,
    question: BaseQuestion
}) => createQuestion(payload).then(({ data }) => data));