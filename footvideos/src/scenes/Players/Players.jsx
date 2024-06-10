import { Box, Avatar, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Alert from "@mui/material/Alert";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from "../../components/header/Header";

import PlayerRow from "./PlayerRow";

const Players = () => {
  const [searchparams] = useSearchParams();

  const [loadingTeam, setLoadingTeam] = useState(true);
  const [errorGetTeam, setErrorGetTeam] = useState(false);
  const [team, setTeam] = useState({});


  const [players, setPlayers] = useState([]);
  const [loadingPlayers, setLoadingPlayers] = useState(true);
  const [errorPlayers, setErrorPlayers] = useState(false);

  useEffect(() => {
    const id = searchparams.get('id');

    axios.get(`${import.meta.env.VITE_BASE_PATH}/api/teams/${id}`)
    .then((res) => {
      setTeam(res.data)
    })
    .catch(() => setErrorGetTeam(true))
    .finally(() => setLoadingTeam(false));

    axios.get(`${import.meta.env.VITE_BASE_PATH}/api/players/team/${id}`)
    .then((res) => {
      setPlayers(res.data)
    })
    .catch(() => setErrorPlayers(true))
    .finally(() => setLoadingPlayers(false));
  }, [searchparams]);

  if (loadingTeam) return <p>Loading...</p>
  if (errorGetTeam) return <Alert severity="error">Error loading team</Alert>

  return (
    <>
    <Header />
    
    <Box sx={{display: 'flex', height: '100%', margin: '1em', gap: '1em'}}>
      <Box sx={{ display:'flex', flexDirection: 'column', width: '20%', height: '300px', backgroundColor: '#fff', padding: '0.5em', gap: '10px'}}>
        <Box sx={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Box>
            <Avatar sx={{width: '150px', height: '120px', margin: '0 auto', backgroundColor: '#C70039'}} src={`${import.meta.env.VITE_BASE_PATH}/team-photos/${team.image}`} />
            <Typography variant="h5" align="center">{team.name}</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{width: '80%'}}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Avatar</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map((row) => (
                <PlayerRow key={row.id} {...row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>

    </Box>
    </>
  )
}

export default	Players;