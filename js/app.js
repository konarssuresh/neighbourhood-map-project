var place1=[{
 title:"velammal institute of technology",
 location:{lat:13.2944135,lng:80.14929769999999},
 infow:"",
},{
   title:"anna nagar west",
 location:{lat:13.0937504,lng:80.2073566},
 infow:"",
},{
 title:"vandalur zoo",
 location:{lat:12.8793266,lng:80.0819116},
 infow:"",
},
];
var markers=[];
var infowi=[];

place1.forEach(function(p){
   $.ajax({
        url:"https://en.wikipedia.org/w/api.php?action=opensearch&search="+p.title+"&format=json&callback=call",
        dataType:"jsonp",
        async:false,
        success:function(response){
          var b=response[2][0];
          if(b.length>0){
            p.infow=b;
        }
          else{
          p.infow="no article available in wikipedia about this";
        }
        }
      });
});
for(var i=0;i<place1.length;i++){

  infowi.push(place1[i].infow);
}

var viewModel=function(){
this.filter=ko.observable("");
this.place=ko.observableArray(place1);
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
      //   $.ajax({
      //   url:"https://en.wikipedia.org/w/api.php?action=opensearch&search="+place1[i].title+"&format=json",
      //   dataType:"jsonp",
      //   success:function(response){
      //     var content=response[1];

      //     console.log(place1[i].infow);
      //   }
      // });
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
       marker.addListener('click', function(i) {
            console.log(i);
            populateInfoWindow(this, largeInfowindow,i);
          });
       markers.push(marker);
       bounds.extend(marker.position);
       map.fitBounds(bounds);

    }
    // for(var i=0;i<markers.length;i++){
    //   markers[i].addListener("click",function(){
    //     console.log("clicked");
    //     populateInfoWindow(this, largeInfowindow,i);
    //   });
    // }

    var ul=document.getElementById("ulist");

ko.applyBindings(viewModel());

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
  for(var i=0;i<place1.length;i++){
    if(i==z){
      populateInfoWindow(markers[i],largeInfowindow,i);
    }
  }
}

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