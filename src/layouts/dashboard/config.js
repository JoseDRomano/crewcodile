import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import UserGroupIcon from '@heroicons/react/24/solid/UserGroupIcon';
import ClipboardDocumentListIcon from '@heroicons/react/24/solid/ClipboardDocumentListIcon';
import {SvgIcon} from '@mui/material';
import CircleStack from '@heroicons/react/24/solid/CircleStackIcon';
import ChartBarSquareIcon from '@heroicons/react/24/solid/ChartBarSquareIcon';
import CalendarDaysIcon from '@heroicons/react/24/solid/CalendarDaysIcon'
//import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';

export const items = [
    {
        title: 'Dashboard',
        path: '/',
        icon: (
            <SvgIcon fontSize="small">
                <ChartBarIcon/>
            </SvgIcon>
        )
    },
    {
        title: 'Planos de treino',
        path: '/workouts',
        icon: (
            <SvgIcon fontSize="small">
                <ClipboardDocumentListIcon/>
            </SvgIcon>
        )
    },
    {
        title: 'Histórico de treinos',
        path: '/workouts-history',
        icon: (
            <SvgIcon fontSize="small">
                <CalendarDaysIcon/>
            </SvgIcon>
        )
    },
    {
        title: 'Alunos',
        path: '/students',
        icon: (
            <SvgIcon fontSize="small">
                <UserGroupIcon/>
            </SvgIcon>
        )
    },
    {
        title: 'Bibilioteca de exercícios',
        path: '/exercises',
        icon: (
            <SvgIcon fontSize="small">
                <CircleStack/>
            </SvgIcon>
        )
    },
    {
        title: 'Estatísticas',
        path: '/stats',
        icon: (
            <SvgIcon fontSize="small">
                <ChartBarSquareIcon/>
            </SvgIcon>
        )
    },

];
