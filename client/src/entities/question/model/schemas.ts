import * as Yup from 'yup';

export const baseQuestionSchema = Yup.object({
    question: Yup.string().required().trim().ensure(),
    answer: Yup.string().required().trim().ensure(),
})

export const questionSchema = baseQuestionSchema.shape({
    _id: Yup.string().nullable(),
    id: Yup.string().nullable(),
    theme: Yup.string().required(),
})