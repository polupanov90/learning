import {useFormik} from "formik";
import {TextField} from "@mui/material";
import { BaseTheme } from  '../../../shared/api';
type ThemeFormProps = {
    formik: ReturnType<typeof useFormik<BaseTheme>>
}
export const ThemeForm = ({ formik }: ThemeFormProps) => {
    return (
        <>
            <TextField
                label={'тема'}
                fullWidth
                {...formik.getFieldProps('name')}
            />
        </>
    )
}