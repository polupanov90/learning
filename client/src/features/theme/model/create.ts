import {createEffect} from "effector/compat";
import {BaseTheme, createTheme} from "../../../shared/api";

export const createThemeFx = createEffect((data: BaseTheme) => createTheme(data).then(({ data }) => data));