import PropTypes from 'prop-types';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import {Box, Card, CardContent, CardHeader, Stack, SvgIcon, Typography, useTheme} from '@mui/material';
import {Chart} from 'src/components/chart';

const useChartOptions = (labels) => {
    const theme = useTheme();

    return {
        chart: {
            background: 'transparent'
        },
        colors: [
            theme.palette.success.main,
            theme.palette.warning.main,
            theme.palette.error.main
        ],
        dataLabels: {
            enabled: false
        },
        labels,
        legend: {
            show: false
        },
        plotOptions: {
            pie: {
                expandOnClick: false
            }
        },
        states: {
            active: {
                filter: {
                    type: 'none'
                }
            },
            hover: {
                filter: {
                    type: 'none'
                }
            }
        },
        stroke: {
            width: 0
        },
        theme: {
            mode: theme.palette.mode
        },
        tooltip: {
            fillSeriesColor: false
        }
    };
};

const iconMap = {
    Positivo: (
        <SvgIcon>
            <ThumbUpAltIcon style={{color: 'green'}}/>
        </SvgIcon>
    ),
    Neutro: (
        <SvgIcon>
            <SentimentNeutralIcon style={{color: 'orange'}}/>

        </SvgIcon>
    ),
    Negativo: (
        <SvgIcon>
            <ThumbDownAltIcon style={{color: 'red'}}/>
        </SvgIcon>
    )
};

export const OverviewTraffic = (props) => {
    const {chartSeries, labels, sx} = props;
    const chartOptions = useChartOptions(labels);

    return (
        <Card sx={sx}>
            <CardHeader title="Satisfação clientes"/>
            <CardContent>
                <Chart
                    height={300}
                    options={chartOptions}
                    series={chartSeries}
                    type="donut"
                    width="100%"
                />
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="center"
                    spacing={2}
                    sx={{mt: 2}}
                >
                    {chartSeries.map((item, index) => {
                        const label = labels[index];

                        return (
                            <Box
                                key={label}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                            >
                                {iconMap[label]}
                                <Typography
                                    sx={{my: 1}}
                                    variant="h6"
                                >
                                    {label}
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    variant="subtitle2"
                                >
                                    {item}%
                                </Typography>
                            </Box>
                        );
                    })}
                </Stack>
            </CardContent>
        </Card>
    );
};

OverviewTraffic.propTypes = {
    chartSeries: PropTypes.array.isRequired,
    labels: PropTypes.array.isRequired,
    sx: PropTypes.object
};
