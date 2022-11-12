$Team_select=document.querySelector("#Team_select");
$Season_select=document.querySelector("#Season_select");
$Temple_select=document.querySelector("#Temple_select");
$Solo_select=document.querySelector("#Solo_select");

//var data_holder=data;

var Data_filter;

var rows;
var Episode_Name;
var Time_left;
var Team_array;



//Make 4 seperate changed functions
function optionChanged(different_selection){
// //This works if using: python -m http.server from command line
d3.csv("./static/js/Legends.csv", function(data) {

  rows = data;
  

  var $Team_input=$Team_select.value;
  // var $Season_input=$Season_select.value;
  // var $Temple_input=$Temple_select.value;
  // var $Solo_input=$Solo_select.value;

  // console.log($Season_input);
  // console.log($Temple_input);
  // console.log($Solo_input);

  // Time_left=d3.selectAll(data).each(function(d) {
  //     return d.values.filter(function(d){return d.Time_left!=0});
  //   });

  Time_left=d3.selectAll(rows).data(data).filter(function(d){return d.Time_left!=0});
  
  //Team_array=d3.selectAll(rows).filter(function(d){return d.Team=$Team_input});

  console.log(Time_left);


  // Time_Remaining=Time_Remaining(function(d) {
  //   return d.values.filter(function(v) { return v.Time_left!= 0; });
  // })

  //filtered = data.values.filter(function (d) { return d.Time_left!=0; });


  //This format works.
  //console.log(data.Name);

  

});
  console.log(different_selection);
};