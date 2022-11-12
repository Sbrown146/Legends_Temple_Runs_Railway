$Team_select=document.querySelector("#Team_select");
$Season_select=document.querySelector("#Season_select");
$Temple_select=document.querySelector("#Temple_select");
$Solo_select=document.querySelector("#Solo_select");



//Make 4 seperate changed functions
function optionChanged(different_selection){
// //This works if using: python -m http.server from command line
d3.csv("./static/js/Legends.csv", function(error, data) {
  if (error) return console.warn(error);

  d3.select("#sample-metadata").html("");

  var rows = data;
  console.log(rows);
  var team_array=[];
  var team_wins_array=[];

  for (var i=0; i < data.length; i++){
    if (rows[i].Team==different_selection){
      team_array.push(rows[i]);
    }
  }

  for (var j=0; j < data.length; j++){
    if (rows[j].Team==different_selection && rows[j].Time_left!=0){
      team_wins_array.push(rows[j]);
    }
  }

  var team_total_runs=team_array.length;
  var team_wins=team_wins_array.length;

  //d3.select("#sample-metadata").append("h6").text(`Team: ${team_array[0].Team}`);
  d3.select("#sample-metadata").append("h6").text(`Temple Runs: ${team_total_runs}`);
  d3.select("#sample-metadata").append("h6").text(`Temple Victories: ${team_wins}`);
  d3.select("#sample-metadata").append("h6").text(`Temple Success %: ${(team_wins/team_total_runs).toFixed(2)}`);
  //d3.select("#sample-metadata").append("h6").text(`Temple Victories: ${team_wins}`);
  //d3.select("#sample-metadata").append("h6").text(`Temple Victories: ${team_wins}`);

});
  console.log(different_selection);
};