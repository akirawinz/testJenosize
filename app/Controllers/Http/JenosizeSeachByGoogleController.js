"use strict";
const axios = require("axios");
const NodeGeocoder = require("node-geocoder");
const key = "API KEY"; // In real work I always keep secret variable in .env

class JenosizeSeachByGoogleController {
  async search({ request, response }) {
    const { address, name } = request.all();
    const { lat, lng } = await this.getLatLng(address);
    const round = 5000;
    const types = "food";
    const data = await axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${round}&types=${types}&name=${name}&key=${key}`
      )
      .then(function(data) {
        return data.data;
      })
      .catch(function(error) {
        // handle error
        throw new CustomException("มีบางอย่างผิดพลาด ", 500);
      });
    return response.status(200).json({
      status: 200,
      success: true,
      data: data
    });
  }

  async getLatLng(address) {
    const options = {
      provider: "google",
      apiKey: key
    };
    let geocoder = NodeGeocoder(options);
    geocoder = await geocoder
      .geocode(address)
      .then(function(res) {
        return { lat: res[0].latitude, lng: res[0].longitude };
      })
      .catch(function(err) {
        throw new CustomException("มีบางอย่างผิดพลาด ", 500);
      });
    return geocoder;
  }
}

module.exports = JenosizeSeachByGoogleController;
