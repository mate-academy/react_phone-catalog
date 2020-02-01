import React from 'react';
import {getPhonesData} from './Api/getData';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

class Phone extends React.Component {
  state = {
    phoneDetails: [],
  }

  async componentDidMount() {
    const response = await getPhonesData(this.props.match.params.phoneId);

    this.setState({
      phoneDetails: response,
    });
  }

  render() {

    const {match} = this.props;
    const {phoneDetails} = this.state;


    return (
      !phoneDetails.images ? 'Loading...' :
        <React.Fragment>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6}>
              <Carousel
                useKeyboardArrows={true}
                infiniteLoop={true}
                width="70%"
                dynamicHeight={true}
                showIndicators={false}
                autoPlay={true}
                showThumbs={false}
              >
                {phoneDetails.images.map(img => (
                  <img className="responsive-img" src={img} alt={phoneDetails.name}/>
                ))}
              </Carousel>
            </Grid>

            <Grid item xs={12} sm={6}>
              <h1>{phoneDetails.name}</h1>
              <Box fontStyle="italic">
                {phoneDetails.additionalFeatures}
              </Box>
              <h4>Сharacteristic</h4>
              <Box fontSize={15}>
                <List>
                  <ListItem>Storage: {phoneDetails.storage.flash}</ListItem>
                  <ListItem>Ram: {phoneDetails.storage.ram}</ListItem>
                  <ListItem>Display: {phoneDetails.display.screenResolution}</ListItem>
                  <ListItem>CPU: {phoneDetails.hardware.cpu}</ListItem>
                  <ListItem>GPS: {phoneDetails.connectivity.gps && 'Yes'}</ListItem>
                  <ListItem>Talk time: {phoneDetails.battery.talkTime}</ListItem>
                  <ListItem>AudioJack: {phoneDetails.hardware.audioJack}</ListItem>
                  <ListItem>Camera: {phoneDetails.camera.primary}</ListItem>
                  <ListItem>Wi-fi: {phoneDetails.connectivity.wifi}</ListItem>
                  <ListItem>Weight: {phoneDetails.sizeAndWeight.weight}</ListItem>
                </List>
              </Box>
              <Box fontStyle="italic">
                {phoneDetails.description}
              </Box>
            </Grid>
          </Grid>
        </React.Fragment>
    );
  }
}

export default Phone;
