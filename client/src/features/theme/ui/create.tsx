import {useFormik} from "formik";
import {ThemeForm, baseSchema} from '../../../entities/theme';
import {Card} from "../../../shared/card";
import {BaseTheme} from "../../../shared/api";
import {useSnackbar} from 'notistack';
import {useUnit} from "effector-react";
import {createThemeFx} from "../model/create.ts";

const initialValues = baseSchema.cast({});

type ThemeCreateProps = {
    onClose: () => void
}
export const ThemeCreate = ({ onClose }: ThemeCreateProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const createTheme = useUnit(createThemeFx)

    const formik = useFormik<BaseTheme>({
        initialValues: initialValues,
        validationSchema: baseSchema,
        onSubmit: (values) => {
            createTheme(values)
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

    const saveHandler = () => {
        formik.submitForm();
    }
    return (
        <Card
            onClose={onClose}
            onSave={saveHandler}
        >
            <ThemeForm formik={formik}/>
        </Card>
    )
}