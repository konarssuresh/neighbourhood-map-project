//error handling in case map load takes long time to load or if there is any error in it
if (!window.google || !window.google.maps){
  $('#map').append("<h1><br><br>map is loading slow,wait for some time</h1>");
}
var googleError=function(){
  $('#map').append("<h1><br><br>Error in maps,try again later</h1>");
};

// --------------------------------------------------------------------------------------------------------------------

//data model
var place1=[{
 title:"velammal institute of technology",
 location:{lat:13.2944135,lng:80.14929769999999},
 infow:"",
},{
   title:"anna nagar west",
 location:{lat:13.0937504,lng:80.2073566},
 infow:"",
},{
  title:"koyambedu wholesale market",
  location:{lat: 13.0671789,lng: 80.19517809999999},
  infow:"",
},{
  title:"vadapalani andavar temple",
 location:{lat: 13.0528712,lng: 80.2135909},
 infow:"",
},{
 title:"vandalur zoo",
 location:{lat:12.8793266,lng:80.0819116},
 infow:"",
},{
  title:"guindy race course",
 location:{lat: 13.0074001,lng: 80.21406069999999},
 infow:"",
},{
  title:"tambaram sanatorium",
 location:{lat: 12.9451497,lng: 80.129599},
 infow:"",
},{
  title:"ripon building",
 location:{lat: 13.0818799,lng: 80.27159139999999},
 infow:"",
},
];
var markers=[];
//loop to store the data obtained from third party api which is mediawiki in this case to the datamodel
var infowi=[];
//this is done to handle error in case of media wiki api fails to load within 10 secs it will alert the user that there is error in media wiki
var wikitimeout=setTimeout(function(){
for(var i=0;i<place1.length;i++){
  alert("wikipedia error, check network connection and refresh page");
}
},10000);
place1.forEach(function(p){
   $.ajax({
        url:"https://en.wikipedia.org/w/api.php?action=opensearch&search="+p.title+"&format=json&callback=call",
        dataType:"jsonp",
        async:true,
        success:function(response){
          var b=response[2][0];
          if(b.length>0){
            p.infow=b;
        }
          else{
          p.infow="no article available in wikipedia about this";
        }
           clearTimeout(wikitimeout);
        },
        error:function(e){
          e.infow="Error in wikipedia.Please try again later";
        }

      });
});
for(var i=0;i<place1.length;i++){

  infowi.push(place1[i].infow);
}
// viewmodel
var viewModel=function(){
this.filter=ko.observable("");
this.place=ko.observableArray(place1);
//this filters the total list and markers based upon user input
var i;

this.filterArray = ko.computed(function() {
    if (this.filter().length > 0) {
    var check=[];
    for(i=0;i<this.place().length;i++){
    check.push(this.place()[i].title);
    }
     var k=this.filter();
    var result=[];
    for( i=0;i<check.length;i++){
       if(check[i].includes(this.filter())){
        result.push(check[i]);
        markers[i].setMap(map);
       }else
       markers[i].setMap(null);

    }
    return result;
    }else {
    for(i=0;i<markers.length;i++){
        markers[i].setMap(map);
    }
    var res=[];
    for(i=0;i<this.place().length;i++){
        res.push(this.place()[i].title);
    }
    return res;
}
}, this);
};
//this is the function to be called during map load
function initMap(){
this.map=new google.maps.Map(document.getElementById("map"),{
    center:{lat:13.2944135,lng:80.14929769999999},
    zoom:12
});
var largeInfowindow = new google.maps.InfoWindow();
 var bounds=new google.maps.LatLngBounds();
    // var o;
    // for(var i=0;i<place1.length;i++){
      place1.forEach(function(p){
        var pIndex=place1.indexOf(p);
       var marker=new google.maps.Marker({
       position:p.location,
       title:p.title,
       // map:map
      });
       marker.addListener('click', function(){
          markerInfo(this,largeInfowindow);
          });
       console.log(typeof marker);
       markers.push(marker);
       bounds.extend(marker.position);
       map.fitBounds(bounds);

    });


ko.applyBindings(viewModel());

}
//function called to select show the infowindow when marker is selected in maps
function markerInfo(marker,info){
var z;
//for(var i=0;i<place1.length;i++){

place1.forEach(function(p){
if(marker.title==p.title){
z=place1.indexOf(p);
 markers[z].setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            markers[z].setAnimation(null);
        }, 700);
    if (info.marker != marker) {
    info.marker = marker;
    info.setContent('<div>' + place1[z].infow + '</div>');
    info.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    info.addListener('closeclick',function(){
      info.marker=null;
    });
  }
console.log(z);
}
});
console.log(z);
}
function listItem(place){
  var z=null;
  var largeInfowindow=new google.maps.InfoWindow();
  for(var i=0;i<place1.length;i++){
   if(place==place1[i].title){
   z=i;
   }
  }
  markers[z].setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            markers[z].setAnimation(null);
        }, 700);
  for(var p=0;p<place1.length;p++){
    if(p==z){
      populateInfoWindow(markers[p],largeInfowindow,p);
    }
  }
}
//function to animate the marker and show infowindow when selected
  function populateInfoWindow(marker, infowindow,n) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
    marker.setAnimation(null);
  }, 700);
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + place1[n].infow + '</div>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
  }
}

