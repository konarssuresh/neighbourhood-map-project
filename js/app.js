var place=[{
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
var mark=[];
var viewModel=function(){
this.filter=ko.observable("");
this.filterArray = ko.computed(function() {
    if (this.filter().length > 0) {
    var check=[];
    for(var i=0;i<place.length;i++){
    check.push(place[i].title);
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
    for(var i=0;i<place.length;i++){
        res.push(place[i].title);
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
 var bounds=new google.maps.LatLngBounds();
    for(var i=0;i<place.length;i++){
       var marker=new google.maps.Marker({
       position:place[i].location,
       title:place[i].title,
       // map:map
      });

       markers.push(marker);
       bounds.extend(marker.position);
       map.fitBounds(bounds);

    }
ko.applyBindings(viewModel());
}
