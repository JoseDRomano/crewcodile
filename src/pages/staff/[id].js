import { Layout as DashboardLayout } from '@/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Avatar, Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';

const StaffMemberPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [staff, setStaff] = useState(null);

    useEffect(() => {
        if (id) {
            async function fetchStaffData() {
                try {
                    const response = await fetch(`/api/staff?id=${id}`);
                    const data = await response.json();
                    setStaff(data);
                } catch (error) {
                    console.error('Failed to fetch staff data:', error);
                }
            }
            fetchStaffData();
        }
    }, [id]);

    if (!staff) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <>
            <Head>
                <title>Staff | CrewCodille</title>
            </Head>
            <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
                <Container maxWidth="xl">
                    <Typography gutterBottom variant="h5">
                        Staff - {staff.name}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Avatar
                                            src={staff.photo}
                                            sx={{ height: 100, width: 100, margin: 'auto', mb: 2 }}
                                        />
                                        <Typography variant="h5">{staff.name}</Typography>
                                        <Typography color="textSecondary">{staff.email}</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        {/* Adiciona outras informações relevantes */}
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

StaffMemberPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default StaffMemberPage;
