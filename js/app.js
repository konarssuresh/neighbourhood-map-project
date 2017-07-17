var place=[{
 title:"velammal institute of technology",
 location:{lat:13.2944135,lng:80.14929769999999},
},
];
var markers=[];
// var pos=function(){

// }
var viewModel=function(){
// var filterArray=ko.observableArray([]);
this.filter=ko.observable("");
var location={lat:13.2944135,lng:80.14929769999999};

// var markers=[];
// markers[0].setMap(map);
this.filterArray = ko.computed(function() {
    if (this.filter().length > 0) {
    var check=[];
    for(var i=0;i<place.length;i++){
    check.push(place[i].title);
    }
    console.log(check);
        //filter method ..in this method each element of the array goes to the callback function as argument. its a vanilla javascript built-in method
    var result=check.filter(function(c){
            //includes is another vanilla javascript method which checks if the given element is present in the string
            // console.log(c);
    if(c.includes(this.filter()))
                //if key is present this is added to new array..includes give value either true or false
     return c;
    });
    console.log(result);
    markers[0].setMap(map);
    return result;
    }else
    return check;
}, this);

}
function initMap(){
this.map=new google.maps.Map(document.getElementById("map"),{
    center:{lat:13.2944135,lng:80.14929769999999},
    zoom:12
});

    for(var i=0;i<place.length;i++){
       var marker=new google.maps.Marker({
       position:place[i].location,
       title:place[i].title,
       // map:map
      });
       markers.push(marker);
    }



ko.applyBindings(viewModel());
}
