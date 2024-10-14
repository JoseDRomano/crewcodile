import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const muscles = ["Quadríceps", "Abdominais", "Peitorais", "Dorsais", "Lombar", "Bíceps", "Tríceps",
    "Posterior de coxa", "Gémeos", "Deltoides", "Trapézios"].sort();

export default function FormDropdown() {
    const [targetMuscle, setTargetMuscle] = React.useState('');

    const handleChange = (event) => {
        setTargetMuscle(event.target.value);
    };

    return (

        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Músculo Alvo</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={targetMuscle}
                label="Músculo Alvo"
                onChange={handleChange}
            >
                {muscles.map((muscle) => {
                    return <MenuItem key={muscle.toString()} value={muscle}>{muscle}</MenuItem>
                })}
            </Select>
        </FormControl>

    );
}
