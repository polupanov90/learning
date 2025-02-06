import {createEffect, createEvent, createStore, sample} from "effector";
import {editTheme, getThemeList, deleteTheme, Theme} from "../../../shared/api";
import {useUnit} from "effector-react";
import {useEffect, useMemo} from "react";
import {createThemeFx} from "../../../features/theme/model/create.ts";

const fetchThemesFx = createEffect(() => getThemeList().then((data) => data))
export const editThemesFx = createEffect((theme: Theme) => editTheme(theme).then((data) => data))
export const deleteThemeFx = createEffect((ids: string[]) =>Promise.all(ids.map((id) => deleteTheme(id).then((data) => data))).then((results) => results))

const clearThemesEvent = createEvent();
const $themes = createStore<Theme[]>([])
    .on(fetchThemesFx.doneData, (_, payload) => payload)
    .reset(clearThemesEvent);

export const useThemes = () => {
    const themes = useUnit($themes);
    const fetchThemes = useUnit(fetchThemesFx);
    const clearThemes = useUnit(clearThemesEvent);

    useEffect(() => {
        fetchThemes();
        return () => {
            clearThemes()
        }
    }, []);
    return useMemo(() => ({
        themes,
        clearThemes,
        fetchThemes,
    }), [themes, clearThemes, fetchThemes])
}

sample({
    clock: [createThemeFx.doneData, editThemesFx.doneData, deleteThemeFx.doneData],
    target: fetchThemesFx
})