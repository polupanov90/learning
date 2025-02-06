import {Dialog} from "../../../../shared/dialog";
import {useParams, useSearchParams} from "react-router-dom";
import {QuestionCreate} from "../../../../features/question";

export const CreateCard = () => {
    const [sp, setSp] = useSearchParams();
    const isOpen = !!sp.get('create');
    const { themeId } = useParams()
    const closeHandler = () => {
        setSp((_sp) => {
            sp.delete('create');
            return _sp;
        })
    }
    return (
        <Dialog open={isOpen} title={'Создание темы'} onClose={closeHandler}>
            <QuestionCreate onClose={closeHandler} themeId={themeId!}/>
        </Dialog>
    )
}