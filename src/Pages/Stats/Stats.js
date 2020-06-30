import React from 'react';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { FaRocket, FaSatellite, FaSpaceShuttle, FaAngellist, FaRobot } from "react-icons/fa";


class Stats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      launches: [{}]
    }
  }

  // Get all launches and add to local array
  componentDidMount() {
    axios
      .get(`https://api.spacexdata.com/v3/launches/past`)
      .then(res => {
        this.setState({ launches: res.data })
        console.log(this.state.launches)
      })
      .catch(error => console.error(error))
  }

  render() {
    let landedMissions = 0
    let f9Launches = 0
    let fHeavyLaunches = 0
    let f1Launches = 0
    let dragon1Flights = 0
    let crewDragonFlights = 0

    // Computer number of Starlink satellites in space
    const starlink =
    this.state.launches.filter(
      launch => launch.flight_number >= 1 ? launch.rocket.second_stage.payloads[0].payload_id.includes("Starlink") : null)
    
    // Compute number of successful landings on a landing vehicle
    const landSuccess =
    this.state.launches.filter(
      launch => launch.launch_success ? launch.rocket.first_stage.cores[0].landing_type : null) 

    landSuccess.forEach(launch => {
      launch.rocket.first_stage.cores.forEach(core => {
        if (core.land_success && core.landing_type !== 'Ocean') {
          landedMissions += 1;
        }
      })
    })

    // Compute number of Falcon 9 launches
    this.state.launches.forEach(launch => {
      if (launch.flight_number >= 1 && launch.rocket.rocket_id === 'falcon9') {
        f9Launches += 1;
      }
    })

    // Compute number of Falcon Heavy launches
    this.state.launches.forEach(launch => {
      if (launch.flight_number >= 1 && launch.rocket.rocket_id === 'falconheavy') {
        fHeavyLaunches += 1;
      }
    })

    // Compute number of Falcon 1 launches
    this.state.launches.forEach(launch => {
      if (launch.flight_number >= 1 && launch.rocket.rocket_id === 'falcon1') {
        f1Launches += 1;
      }
    })
    
    // Compute number of Dragon 1 flights
    this.state.launches.map(launch => {
      if (launch.flight_number >= 1 
        && launch.launch_success 
        && launch.rocket.second_stage.payloads[0].payload_type.includes('Dragon') 
        && launch.rocket.second_stage.payloads[0].payload_id.indexOf('Dragon Qualification Unit') === -1
        && launch.rocket.second_stage.payloads[0].payload_id.indexOf('Crew') === -1
        ) {
        dragon1Flights += 1;
      }
    })    

    // Compute number of Crew Dragon flights
    this.state.launches.forEach(launch => {
      if (launch.flight_number >= 1 
        && launch.launch_success 
        && launch.rocket.second_stage.payloads[0].payload_type.includes('Crew') 
        ) {
        crewDragonFlights += 1;
      }
    })    


    return (
        <Grid alignItems="center" direction="row" container spacing={3}>

          {/* Starlink satellites in space (assuming 60 satellites per launch) */}
          <Grid item xs={4}>
            <Paper elevation={3} style={{ padding: '15px', background: '#eee', minHeight:'150px', alignText: 'center'}}>
            <Typography>
              No of Starlink satellites in space:
            </Typography>
            <br/>
            <Typography variant="h3"> <FaSpaceShuttle/> {starlink.length * 60}</Typography>
            </Paper>
          </Grid>

          {/* All launches in total (excluding Amos-6 and CRS-7 which were destroyed on launch) */}
          <Grid item xs={4}>
            <Paper elevation={3} style={{ padding: '15px', background: '#eee', minHeight:'150px', alignText: 'center'}}>
            <Typography>
              No of launches in total:
            </Typography>
            <br/>
            <Typography variant="h3">  <FaRocket/> { this.state.launches.length -2 } </Typography>
            </Paper>
          </Grid>

          {/* All successful landings in total */}
          <Grid item xs={4}>
            <Paper elevation={3} style={{ padding: '15px', background: '#eee', minHeight:'150px', alignText: 'center'}}>
            <Typography>
              No of successful landings:
            </Typography>
            <br/>
            <Typography variant="h3"> <FaAngellist/> {landedMissions}</Typography>
            </Paper>
          </Grid>

          {/* All Falcon 1 launches in total  */}
          <Grid item xs={4}>
            <Paper elevation={3} style={{ padding: '15px', background: '#eee', minHeight:'150px', alignText: 'center'}}>
            <Typography>
            No of Falcon 1 launches:
            </Typography>
            <br/>
            <Typography variant="h3"> <FaSatellite/> {f1Launches}</Typography>
            </Paper>
          </Grid>          

          {/* All Falcon 9 launches in total (excluding Amos-6 and CRS-7 which were destroyed on launch) */}
          <Grid item xs={4}>
            <Paper elevation={3} style={{ padding: '15px', background: '#eee', minHeight:'150px', alignText: 'center'}}>
            <Typography>
              No of Falcon 9 launches:
            </Typography>
            <br/>
            <Typography variant="h3"> <FaSpaceShuttle/> { f9Launches -2 }</Typography>
            </Paper>
          </Grid>

          {/* All Falcon Heavy launches in total  */}
          <Grid item xs={4}>
            <Paper elevation={3} style={{ padding: '15px', background: '#eee', minHeight:'150px', alignText: 'center'}}>
            <Typography>
              No of Falcon Heavy launches:
            </Typography>
            <br/>
            <Typography variant="h3"> <FaSatellite/> {fHeavyLaunches}</Typography>
            </Paper>
          </Grid>

          {/* All Dragon 1 flights in total  */}
          <Grid item xs={4}>
            <Paper elevation={3} style={{ padding: '15px', background: '#eee', minHeight:'150px', alignText: 'center'}}>
            <Typography>
              No of Dragon 1 launches:
            </Typography>
            <br/>
            <Typography variant="h3"> <FaSpaceShuttle/>  {dragon1Flights}</Typography>
            </Paper>
          </Grid>

          {/* All Crew Dragon flights in total  */}
          <Grid item xs={4}>
            <Paper elevation={3} style={{ padding: '15px', background: '#eee', minHeight:'150px', alignText: 'center'}}>
            <Typography>
              No of Crew Dragon launches:
            </Typography><br/>
            <Typography variant="h3"> <FaRobot/> {crewDragonFlights}</Typography>
            </Paper>
          </Grid>

        </Grid>
    );
  }
}


export default Stats;
