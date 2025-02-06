import {createEffect, createEvent, createStore, sample} from "effector";
import {deleteQuestion, getTheme, Theme} from "../../../shared/api";
import {useUnit} from "effector-react";
import {useEffect, useMemo} from "react";
import {createQuestionFx} from "../../../features/question";

const fetchThemeFx = createEffect((id: string) => getTheme(id).then((data) => data));
export const deleteQuestionsFx = createEffect((ids: string[]) =>Promise.all(ids.map((id) => deleteQuestion(id).then((data) => data))).then((results) => results))
const clearThemeEvent = createEvent();
const $theme = createStore<Theme | null>(null)
    .on(fetchThemeFx.doneData, (_, payload) => payload)
    .reset(clearThemeEvent);



export const useTheme = (id: string) => {
    const theme = useUnit($theme);
    const fetchTheme = useUnit(fetchThemeFx);
    const clearTheme = useUnit(clearThemeEvent);

    useEffect(() => {
        fetchTheme(id);
        return () => {
            clearTheme();
        }
    }, []);


    return useMemo(() => ({
        theme,
        clearTheme,
        fetchTheme,
    }), [theme, clearTheme, fetchTheme])
}

sample({
    clock: [createQuestionFx.doneData, deleteQuestionsFx.doneData],
    source: $theme,
    fn: (theme) => {
        return theme!.id!;
    },
    target: fetchThemeFx
})