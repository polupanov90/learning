import {createBrowserRouter} from "react-router-dom";
import { Layout } from './layout.tsx';
import { router as themesRouter } from  './themes';
import { router as themeRouter } from  './theme';
import { router as questionnaireRouter } from  './questionnaire';
import { router as statisticsRouter } from  './statistics';
export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            themeRouter,
            themesRouter,
            questionnaireRouter,
            statisticsRouter
        ],
    },
]);