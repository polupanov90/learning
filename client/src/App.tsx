import {Box, styled} from "@mui/material";
import { SnackbarProvider } from 'notistack';
import { RouterProvider } from "react-router-dom";
import { router } from './pages/home';

const Root = styled(Box)({
    height: '100%',
    overflow: 'hidden',
})
function App() {
  return (
    <Root>
        <SnackbarProvider maxSnack={3}>
            <RouterProvider router={router}/>
        </SnackbarProvider>
    </Root>
  )
}
 
export default App
