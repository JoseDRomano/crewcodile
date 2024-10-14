import PropTypes from "prop-types";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';

import {Card, CardContent, Stack, SvgIcon, Typography} from "@mui/material";

export const OverviewWidget = (props) => {
    const {
        icon,
        text,
        differenceDay,
        difference,
        positive = false,
        sx,
        value,

    } = props;

    const selectedIcon = getIconComponent(icon);


    return (
        <Card sx={sx}>
            <CardContent>
                <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
                    <Stack spacing={1}>
                        <Typography color="white" variant="overline">
                            {text}
                        </Typography>
                        <Typography variant="h3" color="white">
                            {value}
                        </Typography>
                    </Stack>
                    <SvgIcon
                        component={selectedIcon} // Render the icon directly as SvgIcon
                        sx={{
                            height: 50,
                            width: 50,
                            color: 'white', // Adjust color as needed
                        }}
                    />

                </Stack>

                {difference && (
                    <Stack alignItems="center" direction="row" spacing={2} sx={{mt: 2}}>
                        <Stack alignItems="center" direction="row" spacing={0.5}>
                            <SvgIcon color={positive ? "success" : "error"} fontSize="small">
                                {positive ? <ArrowUpIcon/> : <ArrowDownIcon/>}
                            </SvgIcon>
                            <Typography color={positive ? "success.main" : "error.main"} variant="body2">
                                {difference}%
                            </Typography>
                        </Stack>
                        <Typography color="white" variant="caption">
                            Desde o último {differenceDay}
                        </Typography>
                    </Stack>
                )}
            </CardContent>
        </Card>
    );
};

OverviewWidget.propTypes = {
    difference: PropTypes.number,
    positive: PropTypes.bool,
    value: PropTypes.string.isRequired,
    sx: PropTypes.object,
};

const getIconComponent = (icon) => {
    switch (icon) {
        case '1':
            return HowToRegRoundedIcon;
        case '2':
            return ErrorRoundedIcon;
        case '3':
            return TaskAltOutlinedIcon;
        case '4':
            return DoneAllOutlinedIcon;
        default:
            return DisabledByDefaultOutlinedIcon;
    }
};
