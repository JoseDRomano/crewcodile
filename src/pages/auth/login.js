import Head from 'next/head';
import NextLink from 'next/link';
import {useRouter} from 'next/navigation';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Box, Button, Link, Stack, TextField, Typography} from '@mui/material';
import {useAuth} from 'src/hooks/use-auth';
import {Layout as AuthLayout} from 'src/layouts/auth/layout';
import {dark_green} from '../../theme/colors';
import { green } from '@mui/material/colors';


const Page = () => {
    const router = useRouter();
    const auth = useAuth();
    const formik = useFormik({
        initialValues: {
            email: 'bbq_ribs_almada@crewcodile.me',
            password: 'Password123!',
            submit: null
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('O email tem que ser válido')
                .max(255)
                .required('O email é necessário'),
            password: Yup
                .string()
                .max(255)
                .required('A password é necessária')
        }),
        onSubmit: async (values, helpers) => {
            try {
                await auth.signIn(values.email, values.password);
                router.push('/');
            } catch (err) {
                helpers.setStatus({success: false});
                helpers.setErrors({submit: err.message});
                helpers.setSubmitting(false);
            }
        }
    });

    return (
        <>
            <Head>
                <title>
                    Login | CrewCodile
                </title>
            </Head>
            <Box
                sx={{
                    backgroundColor: '#121212', // Fundo escuro
                    color: '#FFFFFF',           // Texto branco para contrastar
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    minHeight: '100vh'          // Garante que o fundo cubra toda a altura da página
                }}
            >
                <Box
                    sx={{
                        backgroundColor: '#1E1E1E',  // Fundo escuro da caixa interior
                        maxWidth: 550,
                        px: 3,
                        py: '100px',
                        width: '100%',
                        borderRadius: 2,            // Bordas arredondadas (opcional)
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' // Sombras sutis para dar profundidade
                    }}
                >

                    <div>
                        <Stack
                            spacing={3}
                            sx={{mb: 5}}
                        >
                            <Typography variant='h1'>
                                Bem-vindo ao CrewCodile
                            </Typography>

                            <Typography variant="h4">
                                Login
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Não tem uma conta?
                                &nbsp;
                                <Link
                                    component={NextLink}
                                    href="/auth/register"
                                    underline="hover"
                                    variant="subtitle2"
                                >
                                    Registar
                                </Link>
                            </Typography>
                        </Stack>

                        <form
                            noValidate
                            onSubmit={formik.handleSubmit}
                        >
                            <Stack spacing={3}>
                                <TextField
                                    error={!!(formik.touched.email && formik.errors.email)}
                                    fullWidth
                                    helperText={formik.touched.email && formik.errors.email}
                                    label="Email"
                                    name="email"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="email"
                                    value={formik.values.email}
                                    InputProps={{
                                        style: { color: '#FFFFFF' } // Define a cor do texto como branco
                                    }}
                                    InputLabelProps={{
                                        style: { color: '#FFFFFF' } // Define a cor do label como branco
                                    }}
                                />
                                <TextField
                                    error={!!(formik.touched.password && formik.errors.password)}
                                    fullWidth
                                    helperText={formik.touched.password && formik.errors.password}
                                    label="Password"
                                    name="password"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="password"
                                    value={formik.values.password}
                                    InputProps={{
                                        style: { color: '#FFFFFF' } // Define a cor do texto como branco
                                    }}
                                    InputLabelProps={{
                                        style: { color: '#FFFFFF' } // Define a cor do label como branco
                                    }}
                                />
                            </Stack>
                            {formik.errors.submit && (
                                <Typography
                                    color="error"
                                    sx={{mt: 3, backgroundColor: dark_green.main}}
                                    variant="body2"
                                >
                                    {formik.errors.submit}
                                </Typography>
                            )}
                            <Button
                                fullWidth
                                size="large"
                                sx={{mt: 3, backgroundColor: dark_green.main, '&:hover': {backgroundColor: dark_green.dark}}}
                                type="submit"
                                variant="contained">
                                Continue
                            </Button>
                        </form>

                    </div>
                </Box>
            </Box>
        </>
    );
};

Page.getLayout = (page) => (
    <AuthLayout>
        {page}
    </AuthLayout>
);

export default Page;
