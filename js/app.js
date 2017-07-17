var place1=[{
 title:"velammal institute of technology",
 location:{lat:13.2944135,lng:80.14929769999999},
},{
   title:"anna nagar west",
 location:{lat:13.0937504,lng:80.2073566},
},{
 title:"vandalur zoo",
 location:{lat:12.8793266,lng:80.0819116},
},
];
var markers=[];

// var mark=[];

var viewModel=function(){
// var ul=document.getElementById("ulist");
// this.liNodes=ko.observableArray([]);
this.filter=ko.observable("");
this.place=ko.observableArray([{
 title:"velammal institute of technology",
 location:{lat:13.2944135,lng:80.14929769999999},
},{
   title:"anna nagar west",
 location:{lat:13.0937504,lng:80.2073566},
},{
 title:"vandalur zoo",
 location:{lat:12.8793266,lng:80.0819116},
},
]);
// var place=ko.observableArray(place1);
// for (var i = 0; i < ul.childNodes.length; i++) {
//   if (ul.childNodes[i].nodeName == "LI") {
//     liNodes.push(ul.childNodes[i].innerHTML);
//   }
// }
// console.log(liNodes().length);
// this.listCheck=ko.observableArray([]);
// listCheck=documtent.getElementsByClassName("li");
this.filterArray = ko.computed(function() {
    if (this.filter().length > 0) {
    var check=[];
    for(var i=0;i<this.place().length;i++){
    check.push(this.place()[i].title);
    }
    // var m=check;
    var k=this.filter();
    var result=[];

    for(var i=0;i<check.length;i++){
       if(check[i].includes(this.filter())){
        result.push(check[i]);
        markers[i].setMap(map);
       }else
       markers[i].setMap(null);

    }
    // console.log(result);
    return result;
    }else if(k==undefined||k==null){
    for(var i=0;i<markers.length;i++){
        markers[i].setMap(map);
    }
    var res=[];
    for(var i=0;i<this.place().length;i++){
        res.push(this.place()[i].title);
    }
    return res;
}
}, this);

}
function initMap(){

this.map=new google.maps.Map(document.getElementById("map"),{
    center:{lat:13.2944135,lng:80.14929769999999},
    zoom:12
});
var largeInfowindow = new google.maps.InfoWindow();
 var bounds=new google.maps.LatLngBounds();
    for(var i=0;i<place1.length;i++){

       var marker=new google.maps.Marker({
       position:place1[i].location,
       title:place1[i].title,
       // map:map
      });
       marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });
       markers.push(marker);
       bounds.extend(marker.position);
       map.fitBounds(bounds);

    }
    var ul=document.getElementById("ulist");

ko.applyBindings(viewModel());

}
function listItem(place){
  // console.log(typeOf place());
  var z=null;
  largeInfowindow=new google.maps.InfoWindow();
  for(var i=0;i<place1.length;i++){
if(place==place1[i].title){
  // markers[i].setAnimation(google.maps.Animation.BOUNCE);
  //       setTimeout(function() {
  //           markers[i].setAnimation(null);
  //       }, 500);
   z=i;
 }

 }
  markers[z].setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            markers[z].setAnimation(null);
        }, 500);

     if (largeInfowindow.marker != markers[z]) {
          largeInfowindow.marker = markers[z];
          largeInfowindow.setContent('<div>' + markers[z].title + '</div>');
          largeInfowindow.open(map, markers[z]);
          // Make sure the marker property is cleared if the infowindow is closed.
          largeInfowindow.addListener('closeclick', function() {
            largeInfowindow.marker = null;
          });
        }
}
      function populateInfoWindow(marker, infowindow) {
         marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            marker.setAnimation(null);
        }, 500);
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
      }