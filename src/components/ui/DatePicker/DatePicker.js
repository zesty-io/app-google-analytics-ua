
import { useState, useEffect } from 'react'
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import moment from 'moment'

export function CustomDatePicker(){

    const [anchorEl, setAnchorEl ] = useState(null);
    const [selected, setSelected] = useState('Custom')
    const [dateRange, setDateRange] = useState({
        startDate : "",
        endDate : ""
    })
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        setDateRange({
            startDate : moment().subtract(30, "days").startOf("month").format("YYYY-MM-DD"),
            endDate : moment().format("YYYY-MM-DD"),
        })
    }, [])

    const handleClick = (event) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);
    
    const handleSelect = (event) => {   

        const selectedItem = event.target.value
        setSelected(selectedItem)
        if(selectedItem === "Today"){
            setDateRange({
                startDate : moment().format("YYYY-MM-DD"),
                endDate : moment().format("YYYY-MM-DD")
            })
        }

        if(selectedItem === "Yesterday"){
            setDateRange({
                startDate : moment().subtract(1, "days").format("YYYY-MM-DD"),
                endDate : moment().format("YYYY-MM-DD")
            })
        }

        if(selectedItem === "Last Week"){
            setDateRange({
                startDate : moment().subtract(1, "weeks").startOf("week").format("YYYY-MM-DD"),
                endDate : moment().subtract(1, "weeks").endOf("week").format("YYYY-MM-DD"),
            })
        }

        if(selectedItem === "Last Month"){
            setDateRange({
                startDate : moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD"),
                endDate : moment().subtract(1, "months").endOf("month").format("YYYY-MM-DD"),
            })
        }

        if(selectedItem === "Last 7 Days"){
            setDateRange({
                startDate : moment().subtract(7, "days").startOf("month").format("YYYY-MM-DD"),
                endDate : moment().format("YYYY-MM-DD"),
            })
        }

        if(selectedItem === "Last 30 Days"){
            setDateRange({
                startDate : moment().subtract(30, "days").startOf("month").format("YYYY-MM-DD"),
                endDate : moment().format("YYYY-MM-DD"),
            })
        }
    }

    useEffect(() => {
        console.log(dateRange)
    }, [dateRange])



    return (
        <>
            <Button aria-describedby={id} variant="contained" onClick={handleClick} color="secondary">
                Change Date Range
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
            >
              <Box sx={{ 
                    minWidth: 200, 
                    padding : 4,
                    display : "flex",
                    flexDirection : "column",
                    gap: 2
                }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Date Range</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selected}
                            label="Date Range"
                            onChange={handleSelect}
                        >
                            <MenuItem value="Custom">Custom</MenuItem>
                            <MenuItem value="Today">Today</MenuItem>
                            <MenuItem value="Yesterday">Yesterday</MenuItem>
                            <MenuItem value="Last Week">Last Week</MenuItem>
                            <MenuItem value="Last Month">Last Month</MenuItem>
                            <MenuItem value="Last 7 Days">Last 7 Days</MenuItem>
                            <MenuItem value="Last 30 Days">Last 30 Days</MenuItem>
                        </Select>
                    </FormControl>
                    { selected === "Custom" && (
                        <>
                            <TextField
                                name="startDate"
                                label="Start Date"
                                InputLabelProps={{ shrink: true, required: true }}
                                type="date"
                                defaultValue={dateRange.startDate}
                                onChange={() => {
                                    setSelected("Custom")
                                }}
                            />
                            <TextField
                                name="endDate"
                                label="End Date"
                                InputLabelProps={{ shrink: true, required: true }}
                                type="date"
                                defaultValue={dateRange.endDate}
                                onChange={(event) => {
                                    setSelected("Custom")
                                }}
                            />
                        </>
                    ) }
                    
                    <Button variant="contained">Set Date Range</Button>
            </Box>
            </Popover>
        </>
    );

}