import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Box, Container, Divider, Grid, Button } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewWidget } from "@/sections/overview/overview-widget";
import { dark_green } from "../theme/colors";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// Lisbon and Almada center point
const center = { lat: 38.736946, lng: -9.142685 };

// Actual Ribs & Company locations
const markers = [
    { id: 1, name: "ALMD1 - Praça de Almada", lat: 38.676121, lng: -9.160743 },
    { id: 2, name: "ALMD2 - Almada Fórum", lat: 38.659724, lng: -9.177223 },
    { id: 3, name: "LIS1 - Amoreiras", lat: 38.726122, lng: -9.154537 },
    { id: 4, name: "LIS2 - Vasco da Gama", lat: 38.768175, lng: -9.094523 },
    { id: 5, name: "LIS3 - Colombo", lat: 38.752041, lng: -9.194892 }
];

const Page = () => {
    const [map, setMap] = useState(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Replace with your API Key
    });

    // Centers the map on a specific marker
    const centerOnMarker = (lat, lng) => {
        if (map) {
            map.panTo({ lat, lng });
            map.setZoom(15); // Adjust zoom level as needed
        }
    };

    return (
        <>
            <Head>
                <title>Dashboard | CrewCodille</title>
            </Head>
            <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
                <Container maxWidth="xl">
                    <Grid container spacing={2}>
                        {/* Total Staff Members Widget */}
                        <Grid item xs={12} sm={6} lg={2.5}>
                            <OverviewWidget
                                icon="1"
                                text={"Total Staff Members"}
                                difference={10}
                                differenceDay={"mês"}
                                positive={true}
                                sx={{
                                    height: "100%",
                                    background: `linear-gradient(to bottom, ${dark_green.main}, black)`,
                                }}
                                value={50} // Hardcoded total staff members
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={1}>
                            <Divider
                                orientation="vertical"
                                flexItem
                                sx={{
                                    height: "100%",
                                    borderRight: "4px solid " + dark_green.main,
                                    margin: "0 16px",
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={0.5} />
                        <Grid item xs={12} sm={6} lg={2.3}>
                            <OverviewWidget
                                icon="2"
                                text={"Reservas hoje"}
                                differenceDay={"dia"}
                                difference={6}
                                positive={true}
                                sx={{ height: "100%", background: `linear-gradient(to bottom, plum, black)` }}
                                value="20" // Hardcoded today's reservations
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={2.3}>
                            <OverviewWidget
                                icon="3"
                                text={"Reservas Semanais"}
                                differenceDay={"semana"}
                                difference={1}
                                positive={false}
                                sx={{ height: "100%", background: `linear-gradient(to bottom, lightgreen, black)` }}
                                value="127" // Hardcoded weekly reservations
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={2.3}>
                            <OverviewWidget
                                icon="4"
                                text={"Reservas Mensais"}
                                differenceDay={"mês"}
                                difference={11}
                                positive={true}
                                sx={{ height: "100%", background: `linear-gradient(to bottom, skyblue, black)` }}
                                value="513" // Hardcoded monthly reservations
                            />
                        </Grid>
                    </Grid>

                    {/* Map Section */}
                    <Box sx={{ mt: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>
                                {isLoaded ? (
                                    <GoogleMap
                                        mapContainerStyle={{ width: "100%", height: "400px" }}
                                        center={center}
                                        zoom={12}
                                        onLoad={(mapInstance) => setMap(mapInstance)}
                                    >
                                        {markers.map((marker) => (
                                            <Marker
                                                key={marker.id}
                                                position={{ lat: marker.lat, lng: marker.lng }}
                                                title={marker.name}
                                            />
                                        ))}
                                    </GoogleMap>
                                ) : (
                                    <div>Loading map...</div>
                                )}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                    {markers.map((marker) => (
                                        <Button
                                            key={marker.id}
                                            variant="contained"
                                            onClick={() => centerOnMarker(marker.lat, marker.lng)}
                                        >
                                            {marker.name}
                                        </Button>
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
