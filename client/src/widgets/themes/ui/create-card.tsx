import {Dialog} from "../../../shared/dialog";
import {useSearchParams} from "react-router-dom";
import {ThemeCreate} from "../../../features/theme/ui/create.tsx";

export const CreateCard = () => {
    const [sp, setSp] = useSearchParams();
    const isOpen = !!sp.get('create');
    const closeHandler = () => {
        setSp((_sp) => {
            sp.delete('create');
            return _sp;
        })
    }
    return (
        <Dialog open={isOpen} title={'Создание темы'} onClose={closeHandler}>
            <ThemeCreate onClose={closeHandler}/>
        </Dialog>
    )
}