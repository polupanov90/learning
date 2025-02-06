import {Tab, Tabs, TabsProps} from "@mui/material";
import {useLocation, useNavigate} from 'react-router-dom'

export const Navigation = () => {
    const location = useLocation();
    const currentLocationMatch = location.pathname.match(/[A-z]+/);
    const currentLocation = Array.isArray(currentLocationMatch) ? currentLocationMatch[0] : "";
    const navigate = useNavigate();


    const tabChangeHandler: TabsProps['onChange'] = (_, value) => {
        if (value !== currentLocation) {
            navigate(value);
        }
    }
    return (
        <Tabs
            value={currentLocation}
            onChange={tabChangeHandler}
        >
            <Tab
                value={"themes"}
                label="Темы"
            />
            <Tab
                value={"questionnaire"}
                label="Вопросники"
            />
            <Tab
                value={"statistics"}
                label="Статистика"
            />
        </Tabs>
    )
}