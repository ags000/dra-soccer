import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TeamCard = ({id, name, image}) => {

  const [removed, setRemoved] = useState(false); 
  const navigate = useNavigate();

  if (removed) return null;

  return (
    <Box sx={{backgroundColor: '#fff', width: '300px', borderRadius: '5px'}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Button color={'error'} startIcon={<DeleteIcon />} onClick={() => {
          axios.delete(`${import.meta.env.VITE_BASE_PATH}/api/teams/${id}`)
          .then(() => {
            setRemoved(true);
          })
        }}>Delete</Button>
        <Button startIcon={<EditIcon />} onClick={() => {
          navigate(`/edit-team?id=${id}`)
        }}>Edit</Button>
      </Box>
      <Avatar sx={{width: '150px', height: '120px', margin: '0 auto', backgroundColor: '#C70039'}} src={`${import.meta.env.VITE_BASE_PATH}/team-photos/${image}`} />
      <Typography variant="h6" sx={{textAlign: 'center'}}>{name}</Typography>

      <Box sx={{display: 'flex', alignItems: 'end', justifyContent: 'end'}}>
        <Button onClick={() => navigate(`/team-players?id=${id}`)}>Players</Button>
      </Box>
      
    </Box>
  )
}

export default TeamCard;