import React from "react";
import Head from "next/head";
import { Box, Container, Grid, Typography, Card, CardContent, CardMedia, Button, Select, MenuItem } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import InfoIcon from "@mui/icons-material/Info";

const Stats = () => {
  return (
    <>
      <Head>
        <title>Statistics | CrewCodile</title>
      </Head>
      <Box component="section" sx={{ p: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Statistics
        </Typography>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {/* Header with Monthly/Yearly Filter */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Box>
                  <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                    Monthly
                  </Button>
                  <Button variant="outlined">Yearly</Button>
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: "medium", mr: 2, display: "inline-block" }}>
                    Month Filter:
                  </Typography>
                  <Select defaultValue="January" sx={{ minWidth: 120 }}>
                    <MenuItem value="January">January</MenuItem>
                    <MenuItem value="February">February</MenuItem>
                    <MenuItem value="March">March</MenuItem>
                  </Select>
                </Box>
              </Box>
            </Grid>

            {/* Customer Satisfaction Gauge */}
            <Grid item xs={12} md={6}>
              <Card sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Customer Satisfaction
                </Typography>
                <Box
                  sx={{
                    position: "relative",
                    width: "150px",
                    height: "75px",
                    margin: "0 auto",
                    borderTopLeftRadius: "75px",
                    borderTopRightRadius: "75px",
                    background: "linear-gradient(to right, red, orange, green)",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      width: "2px",
                      height: "75px",
                      backgroundColor: "black",
                      left: "50%",
                      bottom: "0",
                      transformOrigin: "bottom",
                      transform: "rotate(25deg)", // Adjust angle based on satisfaction score
                    }}
                  />
                </Box>
              </Card>
            </Grid>

            {/* Revenue Section */}
            <Grid item xs={12} md={6}>
              <Card sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Revenue (Profit)
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Gross: <Typography component="span" fontWeight="bold">$75,000</Typography>
                </Typography>
                <Typography variant="body1">
                  Net: <Typography component="span" fontWeight="bold">$41,000</Typography>
                </Typography>
              </Card>
            </Grid>

            {/* Best Sellers Section */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Best Sellers
              </Typography>
              <Grid container spacing={4}>
                {/* Best Seller Item 1 */}
                <Grid item xs={12} md={6}>
                  <Card sx={{ display: "flex" }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 150 }}
                      image="https://via.placeholder.com/150"
                      alt="Mom's Lasagna"
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Mom's Lasagna
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        A large savory slice of our 5-layered homemade lasagna baked in our bolognese sauce, topped with mozzarella.
                      </Typography>
                      <Typography variant="subtitle2" fontWeight="bold">
                        $17.99+
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Best Seller Item 2 */}
                <Grid item xs={12} md={6}>
                  <Card sx={{ display: "flex" }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 150 }}
                      image="https://via.placeholder.com/150"
                      alt="Manicotti"
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Manicotti
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        2 large pasta tubes filled with ricotta cheese filling, baked in your favorite homemade pasta sauce.
                      </Typography>
                      <Typography variant="subtitle2" fontWeight="bold">
                        $14.99
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Stats.getLayout = (stats) => <DashboardLayout>{stats}</DashboardLayout>;

export default Stats;


