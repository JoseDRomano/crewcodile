import Head from 'next/head';
import NextLink from 'next/link';
import {useRouter} from 'next/navigation';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Box, Button, Link, Stack, TextField, Typography} from '@mui/material';
import {useAuth} from 'src/hooks/use-auth';
import {Layout as AuthLayout} from 'src/layouts/auth/layout';
import { ConfirmDialog } from '@/sections/students/confirm-dialog';
import { sleep } from '@/utils/sleep';
import { useDialog } from '@/contexts/dialog-context';

const Page = () => {
    const router = useRouter();
    const dialog = useDialog();
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
            submit: null
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('O email tem que ser válido')
                .max(255)
                .required('Email é obrigatório.'),
            name: Yup
                .string()
                .max(255)
                .required('O Nome é obrigatório.'),
            password: Yup
                .string()
                .max(255)
                .required('Password is required')
        }),
        onSubmit: async (values, helpers) => {
            try {
                //await auth.signUp(values.email, values.name, values.password);
                dialog.setDialogContent({
                    title: "Registar-se como Personal Trainer",
                    type: "confirm",
                    content: "Tem a certeza que quer registar-se como Personal Trainer?",
                    action: async () => {
                        await sleep(250);
                        dialog.setDialogContent({
                            title: "Registar-se como Personal Trainer",
                            type: "confirm",
                            content: "Foi submetido um pré-registo para o nosso sistema. Em dentro de poucos minutos irá receber um email com a confirmação e as informações de acesso. Obrigado por se juntar ao TrainWith.Me",
                            action: async () => {
                                router.push('/auth/login');
                            },
                        })
                    }
                });
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
                    Registar-se como personal trainer | Train With Me
                </title>
            </Head>
            <ConfirmDialog /> 
            <Box
                sx={{
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        maxWidth: 550,
                        px: 3,
                        py: '100px',
                        width: '100%'
                    }}
                >

                    <div>
                        <Stack
                            spacing={1}
                            sx={{mb: 3}}
                        >
                            <Typography variant="h4">
                                Registar-se como Personal Trainer
                            </Typography>
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Já tem conta? Faça o login
                                &nbsp;
                                <Link
                                    component={NextLink}
                                    href="/auth/login"
                                    underline="hover"
                                    variant="subtitle2"
                                >
                                    aqui
                                </Link>
                            </Typography>
                        </Stack>
                        <form
                            noValidate
                            onSubmit={formik.handleSubmit}
                        >
                            <Stack spacing={3}>
                                <TextField
                                    error={!!(formik.touched.name && formik.errors.name)}
                                    fullWidth
                                    helperText={formik.touched.name && formik.errors.name}
                                    label="Nome"
                                    name="name"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                />
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
                                />
                            </Stack>
                            {formik.errors.submit && (
                                <Typography
                                    color="error"
                                    sx={{mt: 3}}
                                    variant="body2"
                                >
                                    {formik.errors.submit}
                                </Typography>
                            )}
                            <Button
                                fullWidth
                                size="large"
                                sx={{mt: 3}}
                                type="submit"
                                variant="contained"
                            >
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
