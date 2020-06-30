import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Grid} from '@material-ui/core/';
import axios from 'axios'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable() {
  const classes = useStyles();
  const [rockets, setRockets] = React.useState([]);

  React.useEffect(() => {
    axios
    .get(`https://api.spacexdata.com/v3/launches/past`)
    .then(res => {
        setRockets(res.data)
    })
    .catch(error => console.error(error))
  }, [])
console.log(rockets)

  return (
    <Grid container>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Flight Number</TableCell>
            <TableCell>Mission Name</TableCell>
            <TableCell align="left">Mission Id</TableCell>
            <TableCell align="left">Launch Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {rockets.map((item, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {item.flight_number}
              </TableCell>
              <TableCell align="left">{item.mission_name}</TableCell>
              <TableCell align="left">{item.mission_id}</TableCell>
              <TableCell align="left">{item.launch_year}</TableCell>
            </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
  );
}
