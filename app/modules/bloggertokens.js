// var Firebase = require('firebase');

// var myDataRef = new Firebase('https://rewardrobe.firebaseIO.com/');
// var newArray = []


// var bloggerTokens = myDataRef.on('value', function(snapshot) {
//   var bloggerTokenArray = snapshot.val();
//     for (i=0;i<bloggerTokenArray.length;i++){
//     newArray.push({name:bloggerTokenArray[i].name, token:bloggerTokenArray[i].token});
//   }
//   console.log(newArray);
//   module.exports = newArray;

// });

    var bloggerTokens = [{
            name: "Gabe Marshall",
            token: "325c1cd5606244517254b720e21258c8"
        }, {
            name: "David Gallegos",
            token: "b90afc2290d9e37d432fa6b4e4dea0d0"
        }
    ];
    console.log(bloggerTokens);

    module.exports = bloggerTokens;