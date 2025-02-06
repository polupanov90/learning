import {IconButton} from "@mui/material";
import {MaterialReactTable, MRT_ColumnDef, MRT_RowSelectionState, useMaterialReactTable} from "material-react-table";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add";
import {CreateCard} from "./create-card.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useMemo, useState} from "react";
import {Link} from "../../../../shared/link";
import {Question, Theme} from "../../../../shared/api";
import {useUnit} from "effector-react/compat";
import {deleteQuestionsFx} from "../../model";

const useColumns = () => {
    const navigate = useNavigate();
    return useMemo(() => [
        {
            header: 'Вопрос',
            accessorKey: 'question',
            Cell: ({ cell, row }) => {
                const value = cell.getValue<string>();
                return  <Link onClick={() => { navigate(row.original.id!) }}>{value}</Link>
            }
        }
    ] as MRT_ColumnDef<Question>[], [navigate])
}


type QuestionsProps = {
    theme: Theme
}
export const Questions = ({ theme }: QuestionsProps) => {
    const [_, setSp] = useSearchParams();
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const deleteQuestions = useUnit(deleteQuestionsFx);

    const addClickHandler = () => {
        setSp((_sp) => {
            _sp.set('create', '1')
            return _sp;
        })
    }

    const columns = useColumns();

    const deleteHandler = () => {
        const ids = theme.questions.map((question, index) => {
            if (Object.keys(rowSelection).includes(String(index))) {
                return question.id
            }
        }).filter((id) => id) as string[];
        deleteQuestions(ids);
    }

    const isDeleteDisabled = useMemo(() => !Object.keys(rowSelection).length, [rowSelection])

    const table = useMaterialReactTable({
        columns,
        data: theme.questions,
        enableRowSelection: true,
        enableGlobalFilter: false,
        enableBottomToolbar : false,
        onRowSelectionChange: setRowSelection,
        state: { rowSelection },
        renderToolbarInternalActions: () => (
            <>
                <IconButton onClick={deleteHandler} disabled={isDeleteDisabled}>
                    <DeleteIcon />
                </IconButton>
                <IconButton onClick={addClickHandler}>
                    <AddIcon />
                </IconButton>
            </>
        ),
    })

    return (
        <>
            <CreateCard/>
            <MaterialReactTable table={table} />
        </>
    )
}