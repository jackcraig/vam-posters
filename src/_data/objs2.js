const Cache = require("@11ty/eleventy-cache-assets");

// Cache the github API request url passed in 
async function fetchData(url) {
    console.log("Attempting to Cache API request");
    try {
        let json = await Cache(url, {
            duration: "1d",
            type: "json",
        });
        console.log("hello" + json.info.version);
        // return json.records;
        // return {
        //     // systemNumber: json.records[0].systemNumber,
        //     // _primaryTitle: json.records[0]._primaryTitle,
        //     // _primaryDate: json.records[0]._primaryDate,
        //     // _iiif_image_base_url: json.records[0]._images
        // }
        return json.records;
    }
    catch (e) {
        console.log("Error caching Github API data");
        return [];
    }
}

module.exports = async function() {
    try {
        const array1 = await fetchData("https://api.vam.ac.uk/v2/objects/search?&id_category=THES252692&kw_object_type=Poster&page_size=100&response_format=json&order_by=date&order_sort=desc&images_exist=1");
        const array2 = await fetchData("https://api.vam.ac.uk/v2/objects/search?id_person=A7753&kw_object_type=Poster&page_size=100&response_format=json&order_by=date&order_sort=desc&images_exist=1");

        // Merges records into one array and uses systemNumber to remove duplcaites
        function mergeDedupe(array) {
            var a = array.concat();
                for(var i=0; i<a.length; ++i) {
                    // console.log("yep" + a[i].systemNumber);
                for(var j=i+1; j<a.length; ++j) {
                    if(a[i].systemNumber === a[j].systemNumber)
                        a.splice(j--, 1);
            }
        }
            return a;
        }

        var records = mergeDedupe(array1.concat(array2));

       // return the promise for each project <Promise{ title: ... }>
        // console.log(records);
        return { records };
    } catch (e) {
        console.log("Error returning multiple projects cached API data");
    } 
};
