import React, { useState } from "react";
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
import GaugeChart from "react-gauge-chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Stats = () => {
  // States for view and month filter
  const [view, setView] = useState("monthly");
  const [selectedMonth, setSelectedMonth] = useState("January");

  // Monthly data
  const monthlyData = {
    January: {
      satisfaction: 0.78,
      revenue: [
        { name: "Gross Income", value: 60000 },
        { name: "Net Income", value: 35000 },
      ],
      bestSellers: [
        {
          rank: 1,
          name: "Mom's Lasagna",
          price: "$17.99+",
          image: "https://via.placeholder.com/300",
          description: "Our famous 5-layered homemade lasagna!",
        },
        {
          rank: 2,
          name: "Chicken Alfredo",
          price: "$15.50",
          image: "https://via.placeholder.com/300",
          description: "Creamy Alfredo sauce over fettuccine pasta.",
        },
        {
          rank: 3,
          name: "Spaghetti Bolognese",
          price: "$13.99",
          image: "https://via.placeholder.com/300",
          description: "Spaghetti topped with a rich, meaty sauce.",
        },
      ],
    },
    February: {
      satisfaction: 0.82,
      revenue: [
        { name: "Gross Income", value: 70000 },
        { name: "Net Income", value: 40000 },
      ],
      bestSellers: [
        {
          rank: 1,
          name: "Chicken Parmigiana",
          price: "$16.50",
          image: "https://via.placeholder.com/300",
          description: "Crispy chicken with marinara sauce.",
        },
        {
          rank: 2,
          name: "Vegetarian Pizza",
          price: "$14.99",
          image: "https://via.placeholder.com/300",
          description: "Pizza topped with fresh veggies and mozzarella.",
        },
        {
          rank: 3,
          name: "Stuffed Shells",
          price: "$18.99+",
          image: "https://via.placeholder.com/300",
          description: "Stuffed shells with ricotta and spinach.",
        },
      ],
    },
    March: {
      satisfaction: 0.85,
      revenue: [
        { name: "Gross Income", value: 80000 },
        { name: "Net Income", value: 45000 },
      ],
      bestSellers: [
        {
          rank: 1,
          name: "Pesto Pasta",
          price: "$15.99",
          image: "https://via.placeholder.com/300",
          description: "Pasta tossed in a homemade basil pesto sauce.",
        },
        {
          rank: 2,
          name: "Seafood Risotto",
          price: "$19.99",
          image: "https://via.placeholder.com/300",
          description: "Creamy risotto with fresh seafood.",
        },
        {
          rank: 3,
          name: "Eggplant Parmigiana",
          price: "$15.99",
          image: "https://via.placeholder.com/300",
          description: "Layered eggplant with marinara and cheese.",
        },
      ],
    },
    April: {
        satisfaction: 0.80,
        revenue: [
          { name: "Gross Income", value: 75000 },
          { name: "Net Income", value: 42000 },
        ],
        bestSellers: [
          {
            rank: 1,
            name: "Garlic Shrimp Scampi",
            price: "$17.99",
            image: "https://via.placeholder.com/300",
            description: "Succulent shrimp in a garlic butter sauce.",
          },
          {
            rank: 2,
            name: "Margherita Pizza",
            price: "$15.50",
            image: "https://via.placeholder.com/300",
            description: "Fresh tomatoes, basil, and mozzarella.",
          },
          {
            rank: 3,
            name: "Four-Cheese Ravioli",
            price: "$14.99",
            image: "https://via.placeholder.com/300",
            description: "Creamy blend of ricotta, parmesan, and mozzarella.",
          },
        ],
      },
      May: {
        satisfaction: 0.83,
        revenue: [
          { name: "Gross Income", value: 78000 },
          { name: "Net Income", value: 43000 },
        ],
        bestSellers: [
          {
            rank: 1,
            name: "Grilled Salmon",
            price: "$20.99",
            image: "https://via.placeholder.com/300",
            description: "Freshly grilled salmon with herbs and spices.",
          },
          {
            rank: 2,
            name: "Spaghetti Carbonara",
            price: "$14.99",
            image: "https://via.placeholder.com/300",
            description: "Creamy pasta with pancetta and parmesan.",
          },
          {
            rank: 3,
            name: "Caprese Salad",
            price: "$11.99",
            image: "https://via.placeholder.com/300",
            description: "Fresh tomatoes, mozzarella, and basil.",
          },
        ],
      },
      June: {
        satisfaction: 0.86,
        revenue: [
          { name: "Gross Income", value: 82000 },
          { name: "Net Income", value: 46000 },
        ],
        bestSellers: [
          {
            rank: 1,
            name: "Penne Arrabbiata",
            price: "$13.99",
            image: "https://via.placeholder.com/300",
            description: "Spicy tomato-based pasta with garlic and chili flakes.",
          },
          {
            rank: 2,
            name: "Chicken Marsala",
            price: "$17.99",
            image: "https://via.placeholder.com/300",
            description: "Chicken cooked with Marsala wine and mushrooms.",
          },
          {
            rank: 3,
            name: "Tiramisu",
            price: "$7.99",
            image: "https://via.placeholder.com/300",
            description: "Classic Italian coffee-flavored dessert.",
          },
        ],
      },
      July: {
        satisfaction: 0.88,
        revenue: [
          { name: "Gross Income", value: 85000 },
          { name: "Net Income", value: 48000 },
        ],
        bestSellers: [
          {
            rank: 1,
            name: "Fettuccine Alfredo",
            price: "$16.99",
            image: "https://via.placeholder.com/300",
            description: "Rich and creamy Alfredo pasta.",
          },
          {
            rank: 2,
            name: "Bruschetta",
            price: "$9.99",
            image: "https://via.placeholder.com/300",
            description: "Toasted bread topped with tomato and basil.",
          },
          {
            rank: 3,
            name: "Gelato",
            price: "$6.99",
            image: "https://via.placeholder.com/300",
            description: "Authentic Italian ice cream.",
          },
        ],
      },
      August: {
        satisfaction: 0.90,
        revenue: [
          { name: "Gross Income", value: 87000 },
          { name: "Net Income", value: 49000 },
        ],
        bestSellers: [
          {
            rank: 1,
            name: "Pesto Pasta",
            price: "$14.99",
            image: "https://via.placeholder.com/300",
            description: "Homemade pesto with fresh basil and pine nuts.",
          },
          {
            rank: 2,
            name: "Eggplant Parmesan",
            price: "$13.50",
            image: "https://via.placeholder.com/300",
            description: "Layers of fried eggplant with marinara and mozzarella.",
          },
          {
            rank: 3,
            name: "Cannoli",
            price: "$5.99",
            image: "https://via.placeholder.com/300",
            description: "Crispy pastry filled with sweet ricotta cream.",
          },
        ],
      },
      September: {
        satisfaction: 0.84,
        revenue: [
          { name: "Gross Income", value: 81000 },
          { name: "Net Income", value: 45000 },
        ],
        bestSellers: [
          {
            rank: 1,
            name: "Risotto Milanese",
            price: "$18.99",
            image: "https://via.placeholder.com/300",
            description: "Creamy saffron-infused risotto.",
          },
          {
            rank: 2,
            name: "Lasagna",
            price: "$17.50",
            image: "https://via.placeholder.com/300",
            description: "Classic lasagna with layers of meat and cheese.",
          },
          {
            rank: 3,
            name: "Caprese Skewers",
            price: "$8.99",
            image: "https://via.placeholder.com/300",
            description: "Skewered tomatoes, mozzarella, and basil.",
          },
        ],
      },
      October: {
        satisfaction: 0.87,
        revenue: [
          { name: "Gross Income", value: 84000 },
          { name: "Net Income", value: 46000 },
        ],
        bestSellers: [
          {
            rank: 1,
            name: "Mushroom Risotto",
            price: "$19.99",
            image: "https://via.placeholder.com/300",
            description: "Rich and creamy risotto with wild mushrooms.",
          },
          {
            rank: 2,
            name: "Seafood Linguine",
            price: "$22.99",
            image: "https://via.placeholder.com/300",
            description: "Linguine with shrimp, clams, and calamari.",
          },
          {
            rank: 3,
            name: "Panna Cotta",
            price: "$6.99",
            image: "https://via.placeholder.com/300",
            description: "Silky smooth cream-based dessert.",
          },
        ],
      },
      November: {
        satisfaction: 0.81,
        revenue: [
          { name: "Gross Income", value: 80000 },
          { name: "Net Income", value: 43000 },
        ],
        bestSellers: [
          {
            rank: 1,
            name: "Baked Ziti",
            price: "$15.99",
            image: "https://via.placeholder.com/300",
            description: "Oven-baked pasta with marinara and cheese.",
          },
          {
            rank: 2,
            name: "Italian Wedding Soup",
            price: "$9.50",
            image: "https://via.placeholder.com/300",
            description: "Savory soup with meatballs and vegetables.",
          },
          {
            rank: 3,
            name: "Espresso",
            price: "$3.99",
            image: "https://via.placeholder.com/300",
            description: "Strong and rich Italian coffee.",
          },
        ],
      },

      December: {
        satisfaction: 0.89,
        revenue: [
          { name: "Gross Income", value: 90000 },
          { name: "Net Income", value: 50000 },
        ],
        bestSellers: [
          {
            rank: 1,
            name: "Tortellini Soup",
            price: "$16.99",
            image: "https://via.placeholder.com/300",
            description: "Hearty soup with cheese-filled tortellini.",
          },
          {
            rank: 2,
            name: "Stuffed Bell Peppers",
            price: "$12.99",
            image: "https://via.placeholder.com/300",
            description: "Peppers stuffed with rice, beef, and cheese.",
          },
          {
            rank: 3,
            name: "Limoncello Cake",
            price: "$7.50",
            image: "https://via.placeholder.com/300",
            description: "Refreshing lemon-flavored cake.",
          },
        ],
      },
  };

  // Yearly data
  const yearlyData = {
    satisfaction: 0.90,
    revenue: [
      { name: "Gross Income", value: 900000 },
      { name: "Net Income", value: 520000 },
    ],
    bestSellers: [
      {
        rank: 1,
        name: "Stuffed Shells",
        price: "$18.99+",
        image: "https://via.placeholder.com/300",
        description: "Delicious pasta shells stuffed with ricotta and spinach.",
      },
      {
        rank: 2,
        name: "Eggplant Parmigiana",
        price: "$15.99",
        image: "https://via.placeholder.com/300",
        description: "Layered eggplant with marinara and cheese.",
      },
      {
        rank: 3,
        name: "Classic Spaghetti",
        price: "$13.50",
        image: "https://via.placeholder.com/300",
        description: "Spaghetti with homemade marinara sauce.",
      },
    ],
  };

  // Get the current data based on view and month
  const currentData = view === "monthly" ? monthlyData[selectedMonth] : yearlyData;

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
                  <Button
                    variant={view === "monthly" ? "contained" : "outlined"}
                    color="primary"
                    sx={{ mr: 1 }}
                    onClick={() => setView("monthly")}
                  >
                    Monthly
                  </Button>
                  <Button
                    variant={view === "yearly" ? "contained" : "outlined"}
                    onClick={() => setView("yearly")}
                  >
                    Yearly
                  </Button>
                </Box>
                {view === "monthly" && (
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "medium", mr: 2, display: "inline-block" }}
                    >
                      Month Filter:
                    </Typography>
                    <Select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      sx={{ minWidth: 120 }}
                    >
                      {Object.keys(monthlyData).map((month) => (
                        <MenuItem key={month} value={month}>
                          {month}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                )}
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
                  percent={currentData.satisfaction}
                  textColor="#000000"
                />
              </Card>
            </Grid>

            {/* Revenue Section */}
            <Grid item xs={12} md={6}>
              <Card sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Revenue Comparison
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={currentData.revenue} barSize={50}>
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

            {/* Best Sellers Section */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Best Sellers
              </Typography>
              <Grid container spacing={4}>
                {currentData.bestSellers.map(({ rank, name, price, image, description }) => (
                  <Grid item xs={12} md={4} key={rank}>
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
                      <Box
                        sx={{
                          position: "absolute",
                          top: 7,
                          right: 10,
                          background: rank === 1 ? "gold" : rank === 2 ? "silver" : "#CD7F32",
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
                        {rank}
                      </Box>

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

Stats.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Stats;
