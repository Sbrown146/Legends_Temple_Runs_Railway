$Team_select=document.querySelector("#Team_select");
$Season_select=document.querySelector("#Season_select");
$Temple_select=document.querySelector("#Temple_select");
$Solo_select=document.querySelector("#Solo_select");



Temp_data_holder=data;

// function Initiate_table(){

//   // Sets up column names.
//   for (var i=0; i<Temp_data_holder.length; i++){
//       var info=Temp_data_holder[i];
//       var table=Object.keys(info);
//       let $table_row=$table_body.insertRow(i);

//       // Adds data for rows.
//       for (var j=0; j<table.length; j++){
//           var table_contents=table[j];
//           var $table_cell=$table_row.insertCell(j);
//           $table_cell.innerText=info[table_contents];
//       }
//   }
// }

function Initiate_pie(x){
  var trace={
    type: "pie",
    values: x[8]
  }
  var layout={
    title: "Test"
  }
  var data_graph=[trace]
  Plotly.newPlot('pie', data_graph, layout);
}


// Search Button function.

function optionChanged(){
  Temp_data_holder=Temp_data_holder.filter(function(get_teams){
    var Team_filter=get_teams.Team;
    return Team_filter==$Team_select.value;
  })
  Temp_data_holder=Temp_data_holder.filter(function(time){
    var Time_filter=time.Time_left;
    return Time_filter!=0;
  })
  Initiate_pie(Temp_data_holder);
};

    