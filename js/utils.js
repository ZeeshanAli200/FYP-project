function writeJson(data, fileName) {
  const fs = require("fs");
  const movie = JSON.stringify(data);
  fs.writeFile(fileName, movie, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
}

function getElement(name) {
  var elem = null;
  if (name) {
    if (document.getElementById(name)) elem = document.getElementById(name);
    else if (document.querySelector("." + name))
      elem = document.querySelector("." + name);
    return elem;
  }
  return elem;
}

const runningMov = [
  {
    VideoEntityId: 38913,
    VideoName: "Hate Story 3",
    VideoDescription:
      "Aditya Dewan and his wife Siya meet Saurav who proposes an absurd deal in order to give Aditya's company a big profit. When Aditya refuses, Saurav destroys his life.",
    VodTVPreviewImage:
      "https://d34080pnh6e62j.cloudfront.net/images/VodTVPreviewImage/16172707411080x605.jpg",
    VideoOnDemandThumb:
      "https://d34080pnh6e62j.cloudfront.net/images/VideoOnDemandThumb/1617270741340x230.jpg",
    NewChannelThumbnailPath:
      "https://d34080pnh6e62j.cloudfront.net/images/NewVideoOnDemandThumb/1617270741324x432.jpg",
    VideoAddedDate: "13 Mar 2018",
    VideoDuration: null,
    IsVideoFree: true,
    IsVideoChannel: false,
    VideoType: 0,
  },
  {
    VideoEntityId: 26741,
    VideoName: "Ghayal Once Again",
    VideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/images/VideoOnDemandThumb/1590140692Ghayal once again low.jpg",
    NewVideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/images/NewVideoOnDemandThumb/1590140692Ghayal once again web.jpg",
    VideoImagePath:
      "https://d34080pnh6e62j.cloudfront.net/images/mobileSmallImage/1590140692Ghayal once again low.jpg",
    VideoImagePathLarge:
      "https://d34080pnh6e62j.cloudfront.net/images/vods/mob_large/ghayaloncehigh.jpg",
    VideoCategory: 8,
    IsVideoFree: true,
    IsVideoChannel: false,
    IsRadio: false,
    PackageImage: "",
  },
  {
    VideoEntityId: 31835,
    VideoName: "Total Siyapaa",
    VideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/adminpanel/assets/uploads/VideoOnDemandThumb/64ddf-image.png",
    NewVideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/adminpanel/assets/uploads/NewVideoOnDemandThumb/b301c-total-siyapaa.jpg",
    VideoImagePath:
      "https://d34080pnh6e62j.cloudfront.net/adminpanel/assets/uploads/VideoOnDemandMobileSmall/bd837-total-siyappa.jpg",
    VideoImagePathLarge:
      "https://d34080pnh6e62j.cloudfront.net/adminpanel/assets/uploads/VideoOnDemandMobileLarge/7509c-total-siyapa.jpg",
    VideoCategory: 8,
    IsVideoFree: true,
    IsVideoChannel: false,
    IsRadio: false,
    PackageImage: "",
  },
  {
    VideoEntityId: 311139,
    VideoName: "Singh Is Kinng",
    VideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/images/VideoOnDemandThumb/1587143840340 x 230.jpg",
    NewVideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/images/NewVideoOnDemandThumb/1587143840324 x 432.jpg",
    VideoImagePath:
      "https://d34080pnh6e62j.cloudfront.net/images/mobileSmallImage/1587143840340 x 230.jpg",
    VideoImagePathLarge:
      "https://d34080pnh6e62j.cloudfront.net/images/mobileLargeImage/15871438401080 x 605.jpg",
    VideoCategory: 8,
    IsVideoFree: true,
    IsVideoChannel: false,
    IsRadio: false,
    PackageImage: "",
  },
  {
    VideoEntityId: 13093,
    VideoName: "Tanu Weds Manu Returns",
    VideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/adminpanel/assets/uploads/VideoOnDemandThumb/97081-image.png",
    NewVideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/adminpanel/assets/uploads/NewVideoOnDemandThumb/27cf7-tanu-weds-manu-return.jpg",
    VideoImagePath:
      "https://d34080pnh6e62j.cloudfront.net/adminpanel/assets/uploads/VideoOnDemandMobileSmall/92dee-image.png",
    VideoImagePathLarge:
      "https://d34080pnh6e62j.cloudfront.net/images/vods/mob_large/tannu weds mannu returns high.jpg",
    VideoCategory: 8,
    IsVideoFree: true,
    IsVideoChannel: false,
    IsRadio: false,
    PackageImage: "",
  },
  {
    VideoEntityId: 311136,
    VideoName: "Gold",
    VideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/images/VideoOnDemandThumb/1587142605340 x 230.jpg",
    NewVideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/images/NewVideoOnDemandThumb/1587142605324 x 432.jpg",
    VideoImagePath:
      "https://d34080pnh6e62j.cloudfront.net/images/mobileSmallImage/1587142605340 x 230.jpg",
    VideoImagePathLarge:
      "https://d34080pnh6e62j.cloudfront.net/images/mobileLargeImage/15871426051080 x 605.jpg",
    VideoCategory: 8,
    IsVideoFree: true,
    IsVideoChannel: false,
    IsRadio: false,
    PackageImage: "",
  },
  {
    VideoEntityId: 311136,
    VideoName: "Gold",
    VideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/images/VideoOnDemandThumb/1587142605340 x 230.jpg",
    NewVideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/images/NewVideoOnDemandThumb/1587142605324 x 432.jpg",
    VideoImagePath:
      "https://d34080pnh6e62j.cloudfront.net/images/mobileSmallImage/1587142605340 x 230.jpg",
    VideoImagePathLarge:
      "https://d34080pnh6e62j.cloudfront.net/images/mobileLargeImage/15871426051080 x 605.jpg",
    VideoCategory: 8,
    IsVideoFree: true,
    IsVideoChannel: false,
    IsRadio: false,
    PackageImage: "",
  },
  {
    VideoEntityId: 37975,
    VideoName: "Hindi Medium",
    VideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/adminpanel/assets/uploads/VideoOnDemandThumb/94708-hindi-medium-low.png",
    NewVideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/adminpanel/assets/uploads/NewVideoOnDemandThumb/5f76d-hindi-medium-small.jpg",
    VideoImagePath:
      "https://d34080pnh6e62j.cloudfront.net/adminpanel/assets/uploads/VideoOnDemandMobileSmall/8f85e-hindi-medium-low.png",
    VideoImagePathLarge:
      "https://d34080pnh6e62j.cloudfront.net/adminpanel/assets/uploads/VideoOnDemandMobileLarge/d083d-hindi-medium-high.png",
    VideoCategory: 8,
    IsVideoFree: true,
    IsVideoChannel: false,
    IsRadio: false,
    PackageImage: "",
  },
  {
    VideoEntityId: 311137,
    VideoName: "Race 3",
    VideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/images/VideoOnDemandThumb/1617270939340x230.jpg",
    NewVideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/images/NewVideoOnDemandThumb/1617270939324x432.jpg",
    VideoImagePath:
      "https://d34080pnh6e62j.cloudfront.net/images/mobileSmallImage/1617270939340x230.jpg",
    VideoImagePathLarge:
      "https://d34080pnh6e62j.cloudfront.net/images/mobileLargeImage/16172709391080x605.jpg",
    VideoCategory: 8,
    IsVideoFree: true,
    IsVideoChannel: false,
    IsRadio: false,
    PackageImage: "",
  },
  {
    VideoEntityId: 311534,
    VideoName: "Saamy 2",
    VideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/images/VideoOnDemandThumb/1593983704340 x 230.jpg",
    NewVideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/images/NewVideoOnDemandThumb/1593983704324 x 432.jpg",
    VideoImagePath:
      "https://d34080pnh6e62j.cloudfront.net/images/mobileSmallImage/1593983704340 x 230.jpg",
    VideoImagePathLarge:
      "https://d34080pnh6e62j.cloudfront.net/images/mobileLargeImage/15939837041080 x 605.jpg",
    VideoCategory: 8,
    IsVideoFree: true,
    IsVideoChannel: false,
    IsRadio: false,
    PackageImage: "",
  },
  {
    VideoEntityId: 311099,
    VideoName: "Padman",
    VideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/images/VideoOnDemandThumb/1586842746340 x 230.jpg",
    NewVideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/images/NewVideoOnDemandThumb/1586842746324 x 432.jpg",
    VideoImagePath:
      "https://d34080pnh6e62j.cloudfront.net/images/mobileSmallImage/1586842746340 x 230.jpg",
    VideoImagePathLarge:
      "https://d34080pnh6e62j.cloudfront.net/images/mobileLargeImage/15868427461080 x 605.jpg",
    VideoCategory: 8,
    IsVideoFree: true,
    IsVideoChannel: false,
    IsRadio: false,
    PackageImage: "",
  },
];

const newMov = [
  {
    VideoEntityId: 31835,
    VideoName: "Total Siyapaa",
    VideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/adminpanel/assets/uploads/VideoOnDemandThumb/64ddf-image.png",
    NewVideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/adminpanel/assets/uploads/NewVideoOnDemandThumb/b301c-total-siyapaa.jpg",
    VideoImagePath:
      "https://d34080pnh6e62j.cloudfront.net/adminpanel/assets/uploads/VideoOnDemandMobileSmall/bd837-total-siyappa.jpg",
    VideoImagePathLarge:
      "https://d34080pnh6e62j.cloudfront.net/adminpanel/assets/uploads/VideoOnDemandMobileLarge/7509c-total-siyapa.jpg",
    VideoCategory: 8,
    IsVideoFree: true,
    IsVideoChannel: false,
    IsRadio: false,
    PackageImage: "",
  },
  {
    VideoEntityId: 311137,
    VideoName: "Race 3",
    VideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/images/VideoOnDemandThumb/1617270939340x230.jpg",
    NewVideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/images/NewVideoOnDemandThumb/1617270939324x432.jpg",
    VideoImagePath:
      "https://d34080pnh6e62j.cloudfront.net/images/mobileSmallImage/1617270939340x230.jpg",
    VideoImagePathLarge:
      "https://d34080pnh6e62j.cloudfront.net/images/mobileLargeImage/16172709391080x605.jpg",
    VideoCategory: 8,
    IsVideoFree: true,
    IsVideoChannel: false,
    IsRadio: false,
    PackageImage: "",
  },
  {
    VideoEntityId: 13093,
    VideoName: "Tanu Weds Manu Returns",
    VideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/adminpanel/assets/uploads/VideoOnDemandThumb/97081-image.png",
    NewVideoImageThumbnail:
      "https://d34080pnh6e62j.cloudfront.net/adminpanel/assets/uploads/NewVideoOnDemandThumb/27cf7-tanu-weds-manu-return.jpg",
    VideoImagePath:
      "https://d34080pnh6e62j.cloudfront.net/adminpanel/assets/uploads/VideoOnDemandMobileSmall/92dee-image.png",
    VideoImagePathLarge:
      "https://d34080pnh6e62j.cloudfront.net/images/vods/mob_large/tannu weds mannu returns high.jpg",
    VideoCategory: 8,
    IsVideoFree: true,
    IsVideoChannel: false,
    IsRadio: false,
    PackageImage: "",
  },
];

async function saveMovies() {
  try {
    newMov.forEach(async (element) => {
      console.log("saving ...");
      await db.collection("movieList").add(element);
    });
    // fetch("https://app.tapmad.com/api/getAllMoviesWithPagination/0/5/0/16")
    //   .then((r) => r.json())
    //   .then((resp) => {
    //     runningMov.forEach(async (element) => {
    //       await db.collection("movieList").add(element);
    //     });
    //     // writeJson(mov, "../json/movies.json");
    //   });
  } catch (error) {}
}
