
import {Actions, Card as CardTemplate} from "../../tamplate";
import {Box, Button} from "@mui/material";
import {PropsWithChildren} from "react";

type CardProps = PropsWithChildren<{
    onClose: () => void;
    onSave: () => void;
    saveDisabled?: boolean
}>
export const Card = ({ onClose, onSave, saveDisabled, children }: CardProps) => {

    return (
        <CardTemplate>
            <Box overflow={'hidden'} padding={'10px'}>
                {children}
            </Box>
            <Actions padding={'10px'}>
                <Button onClick={onClose}>отмена</Button>
                <Button onClick={onSave} disabled={saveDisabled}>сохранить</Button>
            </Actions>
        </CardTemplate>
    )
}