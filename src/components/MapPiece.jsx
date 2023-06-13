import { React, useState } from 'react'
import {Box, Dialog, DialogContent, styled, Typography} from '@mui/material';
import '../App.css';
import Image from "mui-image";
import CharacterDialogTitle from "./CharacterDialog";

const CharacterDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function MapPiece(props) {
    const [open, setOpen] = useState(false);
    const [tokenId, setTokenId] = useState(false);
    const [hydeInfo, setHydeInfo] = useState(false);
    const id = props.id;
    const hydes = props.data;

    const handleClickOpen = (id, hyde) => {
        setTokenId(id);
        setHydeInfo(hyde);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getPins = () => {
        if (hydes) {
            //https://stackoverflow.com/questions/26795643/how-to-convert-object-containing-objects-into-array-of-objects
            const arrayOfObj = Object.entries(hydes["hydes"]).map((e) => ( { [e[0]]: e[1] } ));
            //console.log(parseInt(Object.keys(arrayOfObj[0])))
            //console.log(Object.values(arrayOfObj[0])[0].location)
            return arrayOfObj;
        } else {
            return []
        }
    }

    const getName = () => {
        //TODO: determine name by time
        return hydeInfo["humanName"];
    }

    const isHyde = (modifier) => {
        const currentHour = ((Date.now() / 1000) % (24 * 60 * 60)) / 3600;
        const modifiedHour = currentHour + modifier;
        return (modifiedHour >= 0 && modifiedHour < 6) || (modifiedHour >= 24 && modifiedHour < 30);
    }

    return (
        <Box>
            <Box sx={{position: "absolute"}}>
                {
                    getPins().map((item, index) => (
                        <Box key={index}>
                            <Image
                                src={isHyde(Object.values(item)[0].location.timezone) ? `images/red-pin.png` : `images/blue-pin.png`}
                                alt={`Red Pin`}
                                fit="contain"
                                height="25px"
                                width="25px"
                                sx={{zIndex: 1, left: Object.values(item)[0].location.x, top: Object.values(item)[0].location.y}}
                                onClick={() => { handleClickOpen(parseInt(Object.keys(item)), Object.values(item)[0]) }}
                            >
                            </Image>
                        </Box>
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
            <CharacterDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <CharacterDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {`Token ID # ${tokenId}`}
                </CharacterDialogTitle>
                <DialogContent dividers>
                    <Image
                        src={`http://44.204.241.129:8080/api/image/${tokenId}`}
                        alt={`Hyde ${tokenId}`}
                        fit="contain"
                        height="250px"
                        width="250px"
                    >
                    </Image>
                    <Typography gutterBottom>
                        {getName()}
                    </Typography>
                    <Typography gutterBottom>
                        {`Location: ${hydeInfo ? hydeInfo.location.name : ""}`}
                    </Typography>
                </DialogContent>
            </CharacterDialog>
        </Box>
    )
}