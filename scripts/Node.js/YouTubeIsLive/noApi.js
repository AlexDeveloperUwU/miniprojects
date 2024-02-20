var channelid = "UCSJ4gkVC6NrvII8umztf0Ow";

fetch("https://www.youtube.com/channel/" + channelid)
  .then(function (response) {
    return response.text();
  })
  .then(function (html) {
    if (html.includes("hqdefault_live.jpg")) {
      console.log(true);
    } else {
      console.log(false);
    }
  })
  .catch(function (err) {
    console.warn("Something went wrong", err);
  });
