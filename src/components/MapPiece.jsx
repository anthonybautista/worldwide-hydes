import { React } from 'react'
import {Box} from '@mui/material';
import '../App.css';
import Image from "mui-image";

export default function MapPiece(props) {
    const id = props.id;
    const hydes = props.data;

    const getPins = () => {
        if (hydes) {
            return hydes["hydes"];
        } else {
            return []
        }
    }

    return (
        <Box>
            <Box sx={{position: "absolute"}}>
                {
                    getPins().map((item, index) => (
                        <Image
                            src={`images/red-pin.png`}
                            alt={`Red Pin`}
                            fit="contain"
                            height="25px"
                            width="25px"
                            sx={{zIndex: 1, left: item.location.x, top: item.location.y}}
                        >
                        </Image>
                    ))
                }
            </Box>
            <Box sx={{position: "relative"}}>
                <Image
                    src={`images/map/${id}.png`}
                    alt={`Map Piece ${id}`}
                    fit="contain"
                    height="900px"
                    width="300px"
                >
                </Image>
            </Box>
        </Box>
    )
}