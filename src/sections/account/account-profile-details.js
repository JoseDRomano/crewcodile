import {useCallback, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Unstable_Grid2 as Grid
} from '@mui/material';
import {dark_green} from '../../theme/colors';

const states = [
    {
        value: 'alabama',
        label: 'Alabama'
    },
    {
        value: 'new-york',
        label: 'New York'
    },
    {
        value: 'san-francisco',
        label: 'San Francisco'
    },
    {
        value: 'los-angeles',
        label: 'Los Angeles'
    }
];

export const AccountProfileDetails = () => {
    const [values, setValues] = useState({
        firstName: 'Joaquim',
        lastName: 'Alberto',
        email: 'mammamia@crewcodile.me',
        phone: '',
        state: 'Almada',
        country: 'Portugal'
    });

    const handleChange = useCallback(
        (event) => {
            setValues((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        },
        []
    );

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
        },
        []
    );

    return (
        <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
        >
            <Card>
                <CardHeader
                    subheader="The information can be edited"
                    title="Profile"
                />
                <CardContent sx={{pt: 0}}>
                    <Box sx={{m: -1.5}}>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    helperText="Please specify the first name"
                                    label="First name"
                                    name="firstName"
                                    onChange={handleChange}
                                    required
                                    value={values.firstName}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Last name"
                                    name="lastName"
                                    onChange={handleChange}
                                    required
                                    value={values.lastName}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    onChange={handleChange}
                                    required
                                    value={values.email}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    onChange={handleChange}
                                    type="number"
                                    value={values.phone}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="Country"
                                    name="country"
                                    onChange={handleChange}
                                    required
                                    value={values.country}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    label="City"
                                    name="city"
                                    onChange={handleChange}
                                    required
                                    value={values.state}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
                <Divider/>
                <CardActions sx={{justifyContent: 'flex-end'}}>
                    <Button variant="contained"
                            sx={{
                                backgroundColor: dark_green.main,
                            }}>
                        Save details
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};
