import './App.css';
import { React, useState, useEffect } from 'react'
import {ThemeProvider, createTheme} from "@mui/material/styles";
import {Box, Button, Dialog, DialogContent, Grid, styled, Typography} from "@mui/material";
import { db } from "./utils/firebase";
import { onValue, ref } from "firebase/database";
import Image from "mui-image";
import MapPiece from "./components/MapPiece";
import CharacterDialogTitle from "./components/CharacterDialog";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImdb, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";

const theme = createTheme({
  palette: {
    primary: {
      main: '#080059',
    },
    secondary: {
      main: '#20b2aa',
    },
    info: {
      main: '#FFF7BC',
    },
    warning: {
      main: '#FFAD06',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
    ].join(','),
  },
});

function App() {
  const [currentPiece, setCurrentPiece] = useState(0);
  const [hydes, setHydes] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [openArtist, setOpenArtist] = useState(false);
  const [openSmolrun, setOpenSmolrun] = useState(false);
  const [openMint, setOpenMint] = useState(false);

  const CharacterDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(0),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
    '& .MuiPaper-root': {
      backgroundColor: "transparent",
      backgroundImage: `${getFolder()}`,
      backgroundRepeat: "no-repeat",
      boxShadow: 'none',
      width: 280,
      height: 407,
    }
  }));

  useEffect(() => {
    const getHydes = async () => {
      const query = ref(db, "/");

      return onValue(query, (snapshot) => {
        const data = snapshot.val();
        if (snapshot.exists()) {
          //console.log(data)
          setHydes(data);
        }
      });
    }

    getHydes();
  }, [setHydes]);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize)
  })

  const handleOpen = (type) => {
    if (type === 'artist') {
      setOpenArtist(true);
    } else if (type === 'smolrun') {
      setOpenSmolrun(true);
    } else {
      setOpenMint(true);
    }
  };

  const handleClose = (type) => {
    if (type === 'artist') {
      setOpenArtist(false);
    } else if (type === 'smolrun') {
      setOpenSmolrun(false);
    } else {
      setOpenMint(false);
    }
  };

  const getFolder = () => {
    if (openArtist) {
      return 'url("images/human-folder-blank.png")';
    }
    return 'url("images/hyde-folder-blank.png")';
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Grid container sx={{ backgroundColor: "#2167BD" }} alignItems="center">
            <Grid item xs={3} sx={{margin: 2}}>
              <Image
                  src="/images/logo.png"
                  alt="Worldwide Hydes Logo"
                  fit="contain"
                  sx={{maxHeight: 150}}>
              </Image>
            </Grid>
            <Grid item xs={8} alignSelf="end" sx={{mb: 2}}>
              <Box alignItems="end">
                <Button onClick={() => handleOpen('artist')} sx={{backgroundColor: "#ED8355", border: "2px black solid", color: "black"}}>
                  <Typography>
                    Artist
                  </Typography>
                </Button>
                <Button onClick={() => handleOpen('smolrun')} sx={{backgroundColor: "#ED8355", border: "2px black solid", color: "black", mx: 1}}>
                  <Typography>
                    Studio
                  </Typography>
                </Button>
                <Button onClick={() => handleOpen('mint')} sx={{backgroundColor: "#ED8355", border: "2px black solid", color: "black"}}>
                  <Typography>
                    Mint
                  </Typography>
                </Button>
              </Box>
            </Grid>
          </Grid>

            {
              screenWidth >= 800 ?
                <Grid container sx={{padding:0, width: 1445, margin: "auto"}} alignItems="center" display="flex">
                  <Grid item xs={12} sx={{height: 900}}>
                    <Grid container sx={{padding:0}} alignItems="center" justifyContent="center">
                      <Grid item xs={1}></Grid>
                      <Grid item xs={10} display="flex" alignItems="center" sx={{border: "solid black 2px"}}>
                        {
                          hydes.map((item, index) => (
                              <MapPiece id={index} data={item} key={index}>
                              </MapPiece>
                          ))
                        }
                      </Grid>
                      <Grid item xs={1}></Grid>
                    </Grid>
                  </Grid>
                </Grid>
              :
                <Grid container sx={{padding:0}} alignItems="center">
                  <Grid item xs={12} sx={{height: 1100}}>
                    <Grid container sx={{padding:0, width: "100%"}} alignItems="center">
                      <Grid item xs={1} sm={3} display="flex" justifyContent="right">
                        <Image
                            src="/images/left.png"
                            alt="Left"
                            fit="fill"
                            height="50px"
                            width="50px"
                            sx={{cursor: "pointer", position: "relative" }}
                            onClick={() => currentPiece > 0 ? setCurrentPiece(currentPiece - 1) : ""}
                        >
                        </Image>
                      </Grid>
                      <Grid item xs={10} sm={6} display="flex" alignItems="center" justifyContent="center">
                        <Box sx={{width: 300, border: "solid black 2px"}}>
                          <MapPiece id={currentPiece} data={hydes[currentPiece]} key={currentPiece}>
                          </MapPiece>
                        </Box>
                      </Grid>
                      <Grid item xs={1} sm={3} display="flex" justifyContent="left">
                        <Image
                            src="/images/right.png"
                            alt="Right"
                            fit="fill"
                            height="50px"
                            width="50px"
                            sx={{cursor: "pointer", position: "relative" }}
                            onClick={() => currentPiece < 3 ? setCurrentPiece(currentPiece + 1) : ""}
                        >
                        </Image>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
            }

          <CharacterDialog
              onClose={() => handleClose('artist')}
              aria-labelledby="customized-dialog-title"
              open={openArtist}
          >
            <CharacterDialogTitle id="customized-dialog-title" onClose={() => handleClose('artist')}>
              {`Artist`}
            </CharacterDialogTitle>
            <DialogContent>
              <Image
                  src={`/images/artist.png`}
                  alt={`Tyler Gibson`}
                  fit="contain"
                  height="155px"
                  width="155px"
                  sx={{marginTop: 1.2, marginLeft: 6.5}}
              >
              </Image>
              <Typography gutterBottom sx={{textAlign: "center", mt: 2}}>
                {`Tyler Gibson`}
              </Typography>
              <Box display="flex" justifyContent="center" sx={{mb: 3}}>
                <Link to={{ pathname: "https://www.imdb.com/name/nm10305239/?ref_=nv_sr_srsg_0" }} target="_blank" rel="_norefferer">
                  <FontAwesomeIcon icon={faImdb} color="black" fontSize="32px" className="icons"/>
                </Link>
                <Link to={{ pathname: "https://www.instagram.com/teewhy/" }} target="_blank" rel="_norefferer">
                  <FontAwesomeIcon icon={faInstagram} color="black" fontSize="32px" className="icons"/>
                </Link>
              </Box>
            </DialogContent>
          </CharacterDialog>

          <CharacterDialog
              onClose={() => handleClose('smolrun')}
              aria-labelledby="customized-dialog-title"
              open={openSmolrun}
          >
            <CharacterDialogTitle id="customized-dialog-title" onClose={() => handleClose('smolrun')}>
              {`Studio`}
            </CharacterDialogTitle>
            <DialogContent>
              <Image
                  src={`/images/smolrun.png`}
                  alt={`Smolrun`}
                  fit="contain"
                  height="155px"
                  width="155px"
                  sx={{marginTop: 1.2, marginLeft: 6.5}}
              >
              </Image>
              <Typography gutterBottom sx={{textAlign: "center", mt: 2}}>
                {`Smolrun`}
              </Typography>
              <Box display="flex" justifyContent="center" sx={{mb: 3}}>
                <Link to={{ pathname: "https://twitter.com/smolrun" }} target="_blank" rel="_norefferer">
                  <FontAwesomeIcon icon={faTwitter} color="black" fontSize="32px" className="icons"/>
                </Link>
              </Box>
            </DialogContent>
          </CharacterDialog>

          <CharacterDialog
              onClose={() => handleClose('mint')}
              aria-labelledby="customized-dialog-title"
              open={openMint}
          >
            <CharacterDialogTitle id="customized-dialog-title" onClose={() => handleClose('mint')}>
              {`Mint Details`}
            </CharacterDialogTitle>
            <DialogContent>
              <Image
                  src={`/images/soon.png`}
                  alt={`Coming Soon`}
                  fit="contain"
                  height="155px"
                  width="155px"
                  sx={{marginTop: 1.2, marginLeft: 6.5}}
              >
              </Image>
              <Typography gutterBottom sx={{textAlign: "center", mt: 2}}>
                {`Mint Details TBA`}
              </Typography>
            </DialogContent>
          </CharacterDialog>

          <Grid container sx={{pl:2, backgroundColor: "#2167BD"}} alignItems="center">
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <div className="buffer"></div>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
