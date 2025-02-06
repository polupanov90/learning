import {useFormik} from "formik";
import {Box, styled, TextField} from "@mui/material";
import {BaseQuestion} from '../../../shared/api';



const Root = styled(Box)({
    height: "100%",
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    paddingTop: 10
});

type QuestionFormProps = {
    formik: ReturnType<typeof useFormik<BaseQuestion>>
}
export const QuestionForm = ({ formik }: QuestionFormProps) => {
    return (
        <Root>
            <TextField
                label={'вопрос'}
                fullWidth
                multiline
                {...formik.getFieldProps('question')}
                error={!!formik.errors.question}
                helperText={formik.errors.question}
            />
            <TextField
                label={'ответ'}
                fullWidth
                multiline
                {...formik.getFieldProps('answer')}
                error={!!formik.errors.answer}
                helperText={formik.errors.answer}
            />
        </Root>
    )
}