import Head from "next/head";
import {Box, Container, Grid, Typography} from "@mui/material";
import {Layout as DashboardLayout} from "src/layouts/dashboard/layout";
import {OverviewDB} from "src/sections/overview/overview-db";
import InfoIcon from "@mui/icons-material/Info";
import {OverviewTraffic} from "src/sections/overview/overview-traffic";

const now = new Date();

const Stats = () => (
    <>
        <Head>
            <title>Estatísticas | Train with me</title>
        </Head>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 20,
            }}
        >
            <Container maxWidth="xl">
                <Grid container spacing={3}>
                    {/* First Text Box */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Box
                            sx={{
                                bgcolor: "plum",
                                color: "white",
                                p: 1,
                                borderRadius: 4,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <InfoIcon sx={{fontSize: 18, mr: 1}}/>
                            <Typography variant="body2">Data de adesão</Typography>
                            <Box ml={10}> {/* Adding space here */}
                                <Typography variant="subtitle2" fontWeight="bold">18-11-2023</Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Second Text Box */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Box
                            sx={{
                                bgcolor: "lightgreen",
                                color: "white",
                                p: 1,
                                borderRadius: 4,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <InfoIcon sx={{fontSize: 18, mr: 1}}/>
                            <Typography variant="body2">Número treinos</Typography>
                            <Box ml={10}> {/* Adding space here */}
                                <Typography variant="subtitle2" fontWeight="bold">222</Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Third Text Box */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Box
                            sx={{
                                bgcolor: "skyblue",
                                color: "white",
                                p: 1,
                                borderRadius: 4,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <InfoIcon sx={{fontSize: 18, mr: 1}}/>
                            <Typography variant="body2">Alunos atualmente</Typography>
                            <Box ml={10}> {/* Adding space here */}
                                <Typography variant="subtitle2" fontWeight="bold">23</Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* OverviewDB Component */}
                    <Grid item xs={12} lg={6} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Box sx={{width: '100%', mt: 3,}}>
                            <OverviewDB
                                chartSeries={[
                                    {name: "This year", data: [18, 16, 15, 15, 13, 14, 10, 5, 25, 22, 22, 20]},
                                    {name: "Last year", data: [12, 11, 14, 6, 12, 9, 9, 11, 4, 12, 13, 23]},
                                ]}
                                sx={{height: "100%"}}
                            />
                        </Box>
                    </Grid>

                    {/* OverviewTraffic Component */}
                    <Grid item xs={12} lg={6} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Box sx={{width: '100%', mt: 3}}>
                            <OverviewTraffic
                                chartSeries={[80, 5, 15]}
                                labels={['Positivo', 'Neutro', 'Negativo']}
                                sx={{height: '100%'}}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </>
);

Stats.getLayout = (stats) => <DashboardLayout>{stats}</DashboardLayout>;

export default Stats;
