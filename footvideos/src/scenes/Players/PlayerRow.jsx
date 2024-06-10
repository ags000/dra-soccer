import { TableRow, TableCell, Avatar, Box, Button } from "@mui/material"
import { useState } from "react";
import axios from "axios";

const PlayerRow = ({id, name, photo}) => {

  const [deleted, setDeleted] = useState(false);

  if (deleted) return null;

  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="right"><Avatar src={`${import.meta.env.VITE_BASE_PATH}/player-photos/${photo}`}/></TableCell>
      <TableCell align="right">
        <Box>
          <Button color="error" onClick={() => {
            axios.delete(`${import.meta.env.VITE_BASE_PATH}/api/players/${id}`)
            .then(() => {
              setDeleted(true);
            })
          }}>Delete</Button>
        </Box>
      </TableCell>

    </TableRow>
  )
}

export default PlayerRow;