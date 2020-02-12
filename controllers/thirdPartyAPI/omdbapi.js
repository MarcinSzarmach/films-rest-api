const axios = require("axios");
const omit = require("lodash/omit");

module.exports = {
    getFilmDetailsById: async id => {
        return new Promise(function(resolve, reject) {
            // checking if all environment exits
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
                        message: err.response.data.Error ? err.response.data.Error : "Error with omdbapi"
                    });
                });
        });
    },
    getFilmDetailsByName: async name => {
        console.logger(`Name  ${name}`);
        console.logger(`api key omdbapi ${process.env.OMDBAPI_APIKEY}`);
        return await axios.get(
            `${process.env.OMDBAPI_URL}?t=${id}&apikey=${process.env.OMDBAPI_APIKEY}`
        );
    }
};