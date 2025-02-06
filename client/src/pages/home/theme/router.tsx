import { Layout } from './layout.tsx';
import {RouteObject} from "react-router/dist/lib/context";

export const router: RouteObject = {
    path: "themes/:themeId",
    Component: Layout
};