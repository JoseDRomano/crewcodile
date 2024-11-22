import React from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import GaugeChart from "react-gauge-chart"; // Gauge chart for satisfaction
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import StarIcon from "@mui/icons-material/Star";

const revenueData = [
  { name: "Gross Income", value: 75000 },
  { name: "Net Income", value: 41000 },
];

const bestSellers = [
  {
    rank: 1,
    name: "Mom's Lasagna",
    price: "$17.99+",
    image: "https://minervafoods.com/wp-content/uploads/2022/12/Lasanha-bolonhesa-com-legumes-cenoura-abobrinha-espinafre-HOR-mod-scaled-1.webp",
    description: "Our famous 5-layered homemade lasagna!",
    color: "#FFD700", // Gold
  },
  {
    rank: 2,
    name: "Manicotti",
    price: "$14.99",
    image: "https://via.placeholder.com/300",
    description: "Manicotti baked in your favorite sauce.",
    color: "#C0C0C0", // Silver
  },
  {
    rank: 3,
    name: "Chicken Parmigiana",
    price: "$16.50",
    image: "https://via.placeholder.com/300",
    description: "Crispy chicken with marinara sauce.",
    color: "#CD7F32", // Bronze
  },
];

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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box>
                  <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                    Monthly
                  </Button>
                  <Button variant="outlined">Yearly</Button>
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "medium", mr: 2, display: "inline-block" }}
                  >
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
                <GaugeChart
                  id="satisfaction-gauge"
                  nrOfLevels={20}
                  colors={["#ff4d4d", "#ffa500", "#4caf50"]}
                  arcWidth={0.3}
                  percent={0.82} // Satisfaction score as a percentage (82%)
                  textColor="#000000"
                />
              </Card>
            </Grid>

            {/* Revenue Section (Enhanced Bar Chart) */}
            <Grid item xs={12} md={6}>
              <Card sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Revenue Comparison
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={revenueData} barSize={50}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, fill: "#555555" }}
                    />
                    <YAxis tick={{ fontSize: 12, fill: "#555555" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#f5f5f5",
                        borderRadius: "8px",
                      }}
                      itemStyle={{ color: "#333" }}
                    />
                    <Bar
                      dataKey="value"
                      fill="url(#barGradient)"
                      radius={[10, 10, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="barGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#4caf50" />
                        <stop offset="100%" stopColor="#81c784" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Grid>
            <Grid item xs={12}>
  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
    Best Sellers
  </Typography>
  <Grid container spacing={4}>
    {bestSellers.map(({ rank, name, price, image, description, color }, index) => (
      <Grid item xs={12} md={4} key={index}>
        <Card
          sx={{
            position: "relative",
            height: 300,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            boxShadow: 4,
            borderRadius: 3,
            overflow: "hidden",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: 6,
            },
          }}
        >
          {/* Medal Badge */}
          {rank === 1 && (
            <Box
              sx={{
                position: "absolute",
                top: 7,
                right: 10,
                background: "gold",
                color: "white",
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: "bold",
                zIndex: 10, // Ensure the medal appears above the content
              }}
            >
              1
            </Box>
          )}
          {rank === 2 && (
            <Box
              sx={{
                position: "absolute",
                top: 7,
                right: 10,
                background: "silver",
                color: "white",
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: "bold",
                zIndex: 10,
              }}
            >
              2
            </Box>
          )}
          {rank === 3 && (
            <Box
              sx={{
                position: "absolute",
                top: 7,
                right: 10,
                background: "#CD7F32", // Bronze color
                color: "white",
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: "bold",
                zIndex: 10,
              }}
            >
              3
            </Box>
          )}

          {/* Product Image */}
          <Box
            sx={{
              width: "100%",
              height: 150,
              background: "linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.3))",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              image={image}
              alt={name}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            />
          </Box>

          {/* Product Details */}
          <CardContent sx={{ flexGrow: 1, p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              {name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mb: 2, lineHeight: 1.5 }}
            >
              {description}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "bold",
                fontSize: 18,
                color: "#4caf50",
              }}
            >
              {price}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
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
