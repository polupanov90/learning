import {useFormik} from "formik";
import {QuestionForm, baseQuestionSchema} from '../../../entities/question';
import {Card} from "../../../shared/card";
import {BaseQuestion} from "../../../shared/api";
import {useSnackbar} from 'notistack';
import {useUnit} from "effector-react";
import {createQuestionFx} from "../model/create.ts";
import {useEffect} from "react";

const initialValues = baseQuestionSchema.cast({});

type QuestionCreateProps = {
    onClose: () => void,
    themeId: string
}
export const QuestionCreate = ({ onClose, themeId }: QuestionCreateProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const createQuestion = useUnit(createQuestionFx)

    const formik = useFormik<BaseQuestion>({
        initialValues: initialValues,
        validationSchema: baseQuestionSchema,
        onSubmit: (values) => {
            createQuestion({
                themeId,
                question: values
            })
                .then(() => {
                    enqueueSnackbar('Сохранение прошло успешно', {
                        variant: 'success'
                    })
                }).catch(() => {
                enqueueSnackbar('При сохранении произошла ошибка', {
                    variant: 'error'
                })
            })

                .finally(() => {
                onClose();
            })
        }
    });

    useEffect(() => {
        formik.validateForm();
    }, []);
    const saveHandler = () => {
        formik.submitForm();
    }

    const saveDisabled = !!Object.keys(formik.errors).length
    return (
        <Card
            onClose={onClose}
            onSave={saveHandler}
            saveDisabled={saveDisabled}
        >
            <QuestionForm formik={formik}/>
        </Card>
    )
}