
import {Outlet, useMatches, useNavigate} from "react-router-dom";
import {Box, styled} from "@mui/material";
import {Navigation} from "../../widgets/navigation";
import {grey} from "@mui/material/colors";
import {useEffect} from "react";

const Root = styled(Box)({
    overflow: 'hidden',
    height: '100%',
    display: 'grid',
    gridTemplateRows: "min-content 1ft"
});

const Header = styled(Box)({
    overflow: 'hidden',
    height: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    borderBottom: `1px solid ${grey[400]}`
});

const WorkSpace = styled(Box)({
    overflow: 'hidden',
    padding: 10,
});

export const Layout = () => {
    const matches = useMatches();
    const navigate = useNavigate();
    useEffect(() => {
        if (matches.length <= 1) {
            navigate('themes')
        }
    }, [matches]);

    return (
        <Root>
            <Header>
                <Navigation/>
            </Header>
            <WorkSpace>
                <Outlet/>
            </WorkSpace>
        </Root>
    )
}


