
import { useState, useEffect } from 'react'
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useDateRange, useDateRangeUpdate } from '../../../context/DateRangeContext'

export function CustomDatePicker(){
    const dateRange = useDateRange()
    const dateRangeUpdate = useDateRangeUpdate()

    const [anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);
    
    const handleSelect = (event) => {   

        const selectedItem = event.target.value
        if(selectedItem === "Today"){
            dateRangeUpdate({
                selectedItem : "Today",
                startDate : moment().format("YYYY-MM-DD"),
                endDate : moment().format("YYYY-MM-DD")
            })
        }

        if(selectedItem === "Yesterday"){
            dateRangeUpdate({
                selectedItem : "Yesterday",
                startDate : moment().subtract(1, "days").format("YYYY-MM-DD"),
                endDate : moment().format("YYYY-MM-DD")
            })
        }

        if(selectedItem === "Last Week"){
            dateRangeUpdate({
                selectedItem : "Last Week",
                startDate : moment().subtract(1, "weeks").startOf("week").format("YYYY-MM-DD"),
                endDate : moment().subtract(1, "weeks").endOf("week").format("YYYY-MM-DD"),
            })
        }

        if(selectedItem === "Last Month"){
            dateRangeUpdate({
                selectedItem : "Last Month",
                startDate : moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD"),
                endDate : moment().subtract(1, "months").endOf("month").format("YYYY-MM-DD"),
            })
        }

        if(selectedItem === "Last 7 Days"){
            dateRangeUpdate({
                selectedItem : "Last 7 Days",
                startDate : moment().subtract(7, "days").startOf("month").format("YYYY-MM-DD"),
                endDate : moment().format("YYYY-MM-DD"),
            })
        }

        if(selectedItem === "Last 30 Days"){
            dateRangeUpdate({
                selectedItem : "Last 30 Days",
                startDate : moment().subtract(30, "days").startOf("month").format("YYYY-MM-DD"),
                endDate : moment().format("YYYY-MM-DD"),
            })
        }

        if(selectedItem === "Custom"){
            dateRangeUpdate({
                selectedItem : "Custom",
                startDate : moment().format("YYYY-MM-DD"),
                endDate : moment().format("YYYY-MM-DD"),
            })
        }
    }

    const onDateChange = (event) => {
        dateRangeUpdate({
            ...dateRange, 
            [event.target.name] : event.target.value
        })
    }

    return (
        <>
            <Box sx={{ display : "flex", alignItems : "center", justifyContent : "center", gap : 4 }}>
                <Typography variant="body2" sx={{ color: "#5b667d", fontWeight : "bold" }}>{dateRange.startDate + " - " + dateRange.endDate}</Typography>
                <Button aria-describedby={id} variant="contained" onClick={handleClick} color="secondary" startIcon={<CalendarMonthIcon />}>
                    Change Date Range
                </Button>
            </Box>
           
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
                            value={dateRange.selectedItem}
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
                    { dateRange.selectedItem === "Custom" && (
                        <>
                            <TextField
                                name="startDate"
                                label="Start Date"
                                InputLabelProps={{ shrink: true, required: true }}
                                type="date"
                                defaultValue={dateRange.startDate}
                                onBlur={onDateChange}
                                inputProps={{
                                    max : dateRange.endDate,
                                    required : true,
                                }}
                                
                            />
                            <TextField
                                name="endDate"
                                label="End Date"
                                InputLabelProps={{ shrink: true, required: true }}
                                type="date"
                                defaultValue={dateRange.endDate}
                                onBlur={onDateChange}
                                inputProps={{
                                    min:dateRange.startDate,
                                    required : true
                                }}
                                
                            />
                        </>
                    ) }
                    
            </Box>
            </Popover>
        </>
    );

}