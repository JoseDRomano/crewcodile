import Head from 'next/head';
import {CacheProvider} from '@emotion/react';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {CssBaseline} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import {AuthConsumer, AuthProvider} from 'src/contexts/auth-context';
import {useNProgress} from 'src/hooks/use-nprogress';
import {createTheme} from 'src/theme';
import {createEmotionCache} from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';
import {DialogProvider} from '../contexts/dialog-context';
import FormDialog from '../components/form-dialog';

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;

    useNProgress();

    const getLayout = Component.getLayout ?? ((page) => page);

    const theme = createTheme();

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>
                    TrainWith.Me
                </title>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>

            <DialogProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <AuthProvider>
                        <ThemeProvider theme={theme}>
                            <CssBaseline/>
                            <FormDialog/>
                            <AuthConsumer>
                                {
                                    (auth) => auth.isLoading
                                        ? <SplashScreen/>
                                        : getLayout(<Component {...pageProps} />)
                                }
                            </AuthConsumer>
                        </ThemeProvider>
                    </AuthProvider>
                </LocalizationProvider>
            </DialogProvider>
        </CacheProvider>
    );
};

export default App;
