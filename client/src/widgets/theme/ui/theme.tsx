import {Box, styled, Breadcrumbs, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import { Link } from '../../../shared/link';
import {useTheme} from "../model";
import {Questions} from "./questions";


const Root = styled(Box)({
    overflow: 'hidden',
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'min-content 1fr'
})
export const Theme = () => {
    const { themeId } = useParams();
    const { theme } = useTheme(themeId!);

    const navigate = useNavigate();

    const themesClickHandler = () => {
        navigate('/themes');
    }

    return (
        <Root>
            <Box>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover"  onClick={themesClickHandler}>
                        Темы
                    </Link>
                    <Typography sx={{ color: 'text.primary' }}>{theme?.name}</Typography>
                </Breadcrumbs>
            </Box>
            <Box>
                {
                    theme ?
                        <Questions theme={theme}/> : null
                }
            </Box>
        </Root>
    )
}