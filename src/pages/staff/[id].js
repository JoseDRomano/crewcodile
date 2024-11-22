import { Layout as DashboardLayout } from '@/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Divider,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
} from 'recharts';

// Dummy data for performance with uneven values
const performanceData = [
  { attribute: 'Punctuality', score: 95 },
  { attribute: 'Efficiency', score: 70 },
  { attribute: 'Accuracy', score: 85 },
  { attribute: 'Quality', score: 60 },
  { attribute: 'Attendance', score: 40 },
];

// Customize the radar chart colors and labels
const COLORS = ['#ff7300', '#387908', '#f0ad4e', '#c2185b', '#5c6bc0'];
const performanceLabels = {
  Punctuality: 'Punctuality',
  Efficiency: 'Efficiency',
  Accuracy: 'Accuracy',
  Quality: 'Quality',
  Attendance: 'Attendance',
};

let slave = null;

const StaffMemberPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    if (id) {
        async function fetchStaffData() {
            try {
                console.log(`Fetching data for staff ID: ${id}`);
                const response = await fetch(`/api/staff?id=${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                for (let i = 0; i < data.length; i++) {
                    if (data[i]._id == id) {
                        slave = data[i];
                        setStaff(data[i]);
              
                    }
                }
              
                console.log('Fetched staff data:', slave);
                console.log("NOME DO STAFF :" + data[0].name);

            } catch (error) {
                console.error('Failed to fetch staff data:', error);
            }
        }
        fetchStaffData();
    }
}, [id]);



  //print name of the staff
  

  if (!staff) {
    return <Typography>Loading...</Typography>;
  }

  // Dummy data for statistics (replace with actual API response data)
  const salaryPerHourData = [
    { day: 'Mon', salary: 15 },
    { day: 'Tue', salary: 18 },
    { day: 'Wed', salary: 20 },
    { day: 'Thu', salary: 22 },
    { day: 'Fri', salary: 25 },
  ];
  const totalRevenueData = [
    { month: 'Jan', revenue: 5000 },
    { month: 'Feb', revenue: 7000 },
    { month: 'Mar', revenue: 8000 },
    { month: 'Apr', revenue: 6000 },
    { month: 'May', revenue: 9000 },
  ];
  const averagePerformanceData = [
    { subject: 'Efficiency', score: 75 },
    { subject: 'Accuracy', score: 90 },
    { subject: 'Punctuality', score: 85 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  const performanceLabels = {
    Efficiency: 'Efficiency',
    Accuracy: 'Accuracy',
    Punctuality: 'Punctuality',
  };

  return (
    <>
      <Head>
        <title>Staff | CrewCodile</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Container maxWidth="xl">
          <Typography gutterBottom variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
            Staff - {slave.name}
          </Typography>
          <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
        <Card>
            <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                    src={slave.photo}
                    sx={{ height: 120, width: 120, margin: 'auto', mb: 3 }}
                />
                <Typography variant="h5">{slave.name}</Typography>
                <Typography color="textSecondary">{slave.email}</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2">Restaurant: {slave.restaurant}</Typography>
                <Typography variant="body2">Role: {slave.role}</Typography>
            </CardContent>
        </Card>
    </Grid>

              {/* PERFORMANCE SECTION */}
              <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Performance
                  </Typography>
                  <ResponsiveContainer width="100%" height={229}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="attribute" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Performance"
                        dataKey="score"
                        stroke="#ff7300"
                        fill="#ff7300"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* SALARY PER HOUR AND REVENUE SIDE BY SIDE */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Salary Per Hour
                  </Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={salaryPerHourData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="salary" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Total Revenue
                  </Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={totalRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

StaffMemberPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default StaffMemberPage;
