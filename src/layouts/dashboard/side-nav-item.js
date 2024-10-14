import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {Box, ButtonBase} from '@mui/material';
import {dark_green} from '../../theme/colors';

export const SideNavItem = (props) => {
    const {active = false, disabled, external, icon, path, title} = props;

    const linkProps = path
        ? external
            ? {
                component: 'a',
                href: path,
                target: '_blank'
            }
            : {
                component: NextLink,
                href: path
            }
        : {};

    return (
        <li>
            <ButtonBase
                sx={{
                    alignItems: 'center',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    pl: '20px', // Increased left padding
                    pr: '20px', // Increased right padding
                    py: '10px', // Increased vertical padding
                    textAlign: 'left',
                    width: '100%',
                    margin: '6px 0', // Increased top and bottom margin for spacing
                    ...(active && {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)'
                    }),
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)'
                    }
                }}
                {...linkProps}
            >
                {icon && (
                    <Box
                        component="span"
                        sx={{
                            alignItems: 'center',
                            color: 'neutral.400',
                            display: 'inline-flex',
                            justifyContent: 'center',
                            mr: 3, // Increased right margin
                            ...(active && {
                                color: dark_green.dark
                            })
                        }}
                    >
                        {icon}
                    </Box>
                )}
                <Box
                    component="span"
                    sx={{
                        color: 'neutral.400',
                        flexGrow: 1,
                        fontFamily: (theme) => theme.typography.fontFamily,
                        fontSize: 14,
                        fontWeight: 600,
                        lineHeight: '24px',
                        whiteSpace: 'nowrap',
                        ...(active && {
                            color: 'common.white'
                        }),
                        ...(disabled && {
                            color: 'neutral.500'
                        })
                    }}
                >
                    {title}
                </Box>
            </ButtonBase>
        </li>
    );
};

SideNavItem.propTypes = {
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    external: PropTypes.bool,
    icon: PropTypes.node,
    path: PropTypes.string,
    title: PropTypes.string.isRequired
};
