import {Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography} from '@mui/material';
import {dark_green} from '../../theme/colors';

const user = {
    avatar: '/assets/avatars/avatar-joaquim-alberto.png',
    city: 'Almada',
    country: "Portugal",
    jobTitle: 'CEO Mamma Mia',
    name: 'Joaquim Alberto',
};

export const AccountProfile = () => (


    <Card>
        <CardContent>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Avatar
                    src={user.avatar}
                    sx={{
                        height: 80,
                        mb: 2,
                        width: 80
                    }}
                />
                <Typography
                    gutterBottom
                    variant="h5"
                >
                    {user.name}
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    {user.city}, {user.country}
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    {user.jobTitle}
                </Typography>
            </Box>
        </CardContent>
        <Divider/>
        <CardActions>
            <Button
                fullWidth
                variant="text"
                sx={{
                    color: dark_green.main,
                }}
            >
                Upload picture
            </Button>
        </CardActions>
    </Card>
);
