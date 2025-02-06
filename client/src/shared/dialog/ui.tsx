import {Box, Dialog as MuiDialog, DialogProps as MuiDialogProps, IconButton, styled} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {grey} from "@mui/material/colors";
import { MouseEventHandler } from 'react';

const Root = styled(Box)({
    overflow: 'hidden',
    display: 'grid',
    gridTemplateRows: 'min-content 1fr',
    width: '80vh',
    height: '80vh',
});

const Header = styled(Box)({
    display: 'grid',
    gridTemplateColumns: '1fr min-content',
    fontSize: 20,
    borderBottom: `1px solid ${grey[300]}`
});
const Title = styled(Box)(({ theme }) => ({
    padding: 10,
    fontWeight: "bold",
    color: theme.palette.text.primary
}));

const Content = styled(Box)({
    overflow: 'auto'
});

type DialogProps = MuiDialogProps & {
    title?: string
}
export const Dialog = ({title = "", children, ...props}: DialogProps) => {
    const closeClickHandler: MouseEventHandler = (event) => {
        props.onClose && props.onClose(event, 'escapeKeyDown');
    }

    return (
        <MuiDialog {...props} maxWidth={false}>
            <Root>
                <Header>
                    <Title>{title}</Title>
                    <Box>
                        <IconButton onClick={closeClickHandler}>
                            <CloseIcon color={'primary'}/>
                        </IconButton>
                    </Box>
                </Header>
                <Content>
                    {children}
                </Content>
            </Root>
        </MuiDialog>
    )
}