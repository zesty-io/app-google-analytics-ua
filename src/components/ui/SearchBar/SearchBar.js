
import { useState, useEffect, useCallback } from 'react'
import { TextField, InputAdornment, Popper, Paper,Autocomplete, Box, Typography, Divider } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import SearchBarFilterMenu from './SearchBarFilterMenu';
import { useFetchWrapper } from '../../../services/useFetchWrapper';

export default function SearchBar({ zuid, token }){

    const { searchItems } = useFetchWrapper(zuid, token)
    const [isTyping, setIsTyping] = useState(false)
    const [anchor, setAnchorEl] = useState(null);
    const [data, setData] = useState(null)
    const focus = event => {
        setAnchorEl(event.currentTarget);
    };
    const blur = () => {
        setAnchorEl(null);
    };
    const id = "popperMenu";

    const onMenuClick = (data) => {
        console.log(data)
    }

    const handleChange = async (event) => {
        setIsTyping(true)
        const searchItem = event.target.value
        if(searchItem === "") {
            setData(null) 
            setIsTyping(false)
            return 
        }
        const result = await searchItems(searchItem)
        setData(result.data)
        setIsTyping(false)
    }

    const debounce = (func) => {
        let timer;
        return function (...args){
            const context = this;
            if(timer) clearTimeout(timer)
            timer = setTimeout(() => {
                timer = null
                func.apply(context, args)
            }, 500)
        }
    }

    const optimizeSearch = useCallback(debounce(handleChange), [])

    return (
        <>
            <Box>
                <TextField
                    sx={{
                        width : "600px"
                    }}
                    aria-describedby={id}
                    size="small"
                    placeholder="Search Pages"
                    onFocus={focus}
                    onBlur={blur}
                    onChange={optimizeSearch}
                    inputProps={{
                        autoComplete: 'off'
                     }}
                     />
                <Popper
                    id={id}
                    open={Boolean(anchor)}
                    placement="bottom-start"
                    anchorEl={anchor}
                    disablePortal>
                    <SearchBarFilterMenu data={data} isTyping={isTyping} onMenuClick={onMenuClick} />
                </Popper>
            </Box>
        </>
    )

}