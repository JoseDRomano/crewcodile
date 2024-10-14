import {useState, useEffect} from "react";
import {formatDate} from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {Box, List, ListItem, ListItemText, Typography, useTheme} from "@mui/material";
import { useDialog } from "@/contexts/dialog-context";

const Calendar = () => {
    const theme = useTheme();
    
    const dialog = useDialog();
    const colors = theme.palette.primary.main;
    const [currentEvents, setCurrentEvents] = useState([]);



    useEffect(()=>{
        let ls = localStorage.getItem('events');

        if(ls)
            setCurrentEvents(JSON.parse(ls));
        

    },[])


    const handleDateClick = (selected) => {
        const title = prompt("Por favor adicione o nome do Aluno.");
        const calendarApi = selected.view.calendar;
        
        calendarApi.unselect();
      
        if (title) {
         
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay,
            });

            //save in localstorage
            let events = JSON.parse(localStorage.getItem('events')) || [];
            events.push({
                id: `${selected.dateStr}-${title}`,
                title,
                date: selected.startStr,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay,
            });
            localStorage.setItem('events', JSON.stringify(events));
            setCurrentEvents([...events]);
            
        }
    };

    const handleEventClick = (selected) => {
        dialog.setDialogContent({
            title: "Eliminar uma marcação",
            type: "confirm",
            content: "Tem a certeza que quer eliminar a marcação '" + selected.event.title + "'?",
            action: ()=>{
                let events = JSON.parse(localStorage.getItem('events')) || [];
                events = events.filter((e) => e.id !== selected.event.id);
                localStorage.setItem('events', JSON.stringify(events));
                setCurrentEvents([...events]);
                selected.event.remove();
            }
        });
    }

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between">
                {/* CALENDAR SIDEBAR */}
                <Box flex="1 1 20%" backgroundColor="white" p="10px" borderRadius="4px">
                    <Typography variant="h5">
                        Marcações
                    </Typography>
                    <List>
                        {currentEvents.map((event) => (
                            <ListItem
                                key={event.id}
                                sx={{
                                    margin: "10px 0",
                                    borderRadius: "2px",
                                    backgroundColor: 'neutral.900',
                                    color: 'white', // Optionally adjust text color
                                }}
                            >
                                <ListItemText
                                    primary={event.title}
                                    secondary={
                                        <Typography>
                                            {formatDate(event.start, {year: "numeric", month: "short", day: "numeric"})}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                {/* CALENDAR */}
                <Box flex="1 1 100%" ml="15px">
                    <FullCalendar
                        height="75vh"
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth, timeGridWeek, timeGridDay, listMonth",
                        }}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        select={handleDateClick}
                        eventClick={handleEventClick}
                        eventsSet={(events) => setCurrentEvents(events)}
                        initialEvents={[...localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')): []]}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Calendar;
