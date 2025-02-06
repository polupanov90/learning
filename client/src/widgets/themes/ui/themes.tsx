import {
    MaterialReactTable,
    MRT_ColumnDef,
    useMaterialReactTable,
    MRT_RowSelectionState
} from 'material-react-table';
import {IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {CreateCard} from "./create-card.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import { useThemes, editThemesFx, deleteThemeFx } from '../model';
import {Theme} from "../../../shared/api";
import {useUnit} from "effector-react/compat";
import {useMemo, useState} from "react";
import { Link } from '../../../shared/link';

const useColumns = () => {
    const navigate = useNavigate();
    return useMemo(() => [
        {
            header: 'Тема',
            accessorKey: 'name',
            Cell: ({ cell, row }) => {
                const value = cell.getValue<string>();
                return  <Link onClick={() => { navigate(row.original.id!) }}>{value}</Link>
            }
        }
    ] as MRT_ColumnDef<Theme>[], [navigate])
}

export const Themes = () => {
    const [_, setSp] = useSearchParams();
    const columns = useColumns();
    const editThemes = useUnit(editThemesFx);
    const deleteTheme = useUnit(deleteThemeFx);
    const { themes } = useThemes();
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    const addClickHandler = () => {
        setSp((_sp) => {
            _sp.set('create', '1')
            return _sp;
        })
    }

    const changeHandler = (props: any) => {
        editThemes({
            ...props.row.original,
            ...props.values
        } as Theme).then(() => {
            table.setEditingRow(null)
        })
    }

    const deleteHandler = () => {
        const ids = themes.map((theme, index) => {
            if (Object.keys(rowSelection).includes(String(index))) {
                return theme.id
            }
        }).filter((id) => id) as string[];
        deleteTheme(ids);
    }

    const isDeleteDisabled = useMemo(() => !Object.keys(rowSelection).length, [rowSelection])

    const table = useMaterialReactTable({
        columns,
        data: themes,
        enableRowSelection: true,
        enableGlobalFilter: false,
        enableBottomToolbar : false,
        enableEditing: true,
        onEditingRowSave: changeHandler,
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