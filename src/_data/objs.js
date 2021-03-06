const Cache = require('@11ty/eleventy-cache-assets');

/**
 * Grabs the remote data for studio images and returns back
 * an array of objects
 *
 * @returns {Array} Empty or array of objects
 */


module.exports = async function() {
  try {
    // https://developer.github.com/v3/repos/#get
    let json = await Cache("https://api.vam.ac.uk/v2/objects/search?id_material=AAT12849&id_place=x28849&response_format=json", {
      duration: "1d", // 1 day
      type: "json" // also supports "text" or "buffer"
    });
    console.log("hello jack" + json.info.version);
    return json;
  } catch (ex) {
    console.log(ex);

    // If failed, return back an empty array
    return [];
  }
};

// // Test
// module.exports = function() {
//   return "JACK";
// };

