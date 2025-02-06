import * as Yup from 'yup';

export const baseSchema = Yup.object({
    name: Yup.string().required().trim().ensure(),
})

export const themeSchema = baseSchema.shape({
    _id: Yup.string().nullable(),
    id: Yup.string().nullable(),
    questions: Yup.array().of(Yup.string()).nullable()
})