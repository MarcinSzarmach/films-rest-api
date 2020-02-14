const axios = require("axios");
const omit = require("lodash/omit");

module.exports = {
    getFilmDetailsById: async id => {
        // here I use native Promise, because omdbapi return status 200 with Response: "False"
        return new Promise(function(resolve, reject) {
            // checking if all environment exits => we can add if needed
            // if (!process.env.OMDBAPI_APIKEY)
            //     reject({
            //         message: "omdbapi api url not set"
            //     });
            // if (!process.env.OMDBAPI_URL)
            //     reject({
            //         message: "omdbapi url not set"
            //     });
            axios
                .get(
                    `${process.env.OMDBAPI_URL}?i=${id}&apikey=${process.env.OMDBAPI_APIKEY}`
                )
                .then(resp => {
                    const data = resp.data;
                    if (data.Response == "False") {
                        reject({
                            message: data.Error ? data.Error : "Error code 125" // example code error
                        });
                    } else {
                        resolve(omit(data, "Response"));
                    }
                })
                .catch(err => {
                    reject({
                        message: err.response ?
                            err.response.data.Error ?
                            err.response.data.Error :
                            "Error with omdbapi" :
                            "Error with omdbapi"
                    });
                });
        });
    },
    getFilmDetailsByName: async name => {
        return await axios.get(
            `${process.env.OMDBAPI_URL}?t=${name}&apikey=${process.env.OMDBAPI_APIKEY}`
        );
    }
};