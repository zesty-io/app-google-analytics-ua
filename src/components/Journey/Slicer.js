import Slider from '@mui/material/Slider';


export default function Slicer({ value = 10, onChange }){

    return (
        <>
            <Slider
                aria-label="Small steps"
                defaultValue={value}
                step={1}
                marks
                min={1}
                max={20}
                valueLabelDisplay="auto"
                sx={{
                    width : 200
                }}
                valueLabelFormat={value => `${value} Journey${value !== 1 ? 's' : ''}`}
                onChange={event => onChange(event)}
                color="secondary"
            />
        </>
    )

}