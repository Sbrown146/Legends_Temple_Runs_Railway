
//Variables declared manually, hard coded loop conditional.
function init(){
  d3.csv("./static/js/Legends.csv", function(error, data) {
  if (error) return console.warn(error);

  d3.select("#sample-metadata").html("");
  d3.select("#team-metadata").html("");
  d3.select(".panel-title").html("Stats for: ");  

  
  var rows = data;
  var red_array=[];
  var red_runs_array=[];
  var blue_array=[];
  var blue_runs_array=[];
  var green_array=[];
  var green_runs_array=[];
  var orange_array=[];
  var orange_runs_array=[];
  var purple_array=[];
  var purple_runs_array=[];
  var silver_array=[];
  var silver_runs_array=[];
  var Team_artifacts_found=[];
  var Team_time_array=[];
  var Team_failed_escape=[];
  var Team_failed_acq=[];
  var Team_triple_seizure=[];
  

  for (let i=0; i < data.length; i++){
    if (rows[i].Team=="Red Jaguars" && rows[i].Time_left!=0){
      red_array.push(rows[i]);
    }
    if (rows[i].Team=="Red Jaguars"){
      red_runs_array.push(i);
    }
  }

  for (let i=0; i < data.length; i++){
    if (rows[i].Team=="Blue Barracudas" && rows[i].Time_left!=0){
      blue_array.push(rows[i]);
    }
    if (rows[i].Team=="Blue Barracudas"){
      blue_runs_array.push(i);
    }
  }

  for (let i=0; i < data.length; i++){
    if (rows[i].Team=="Green Monkeys" && rows[i].Time_left!=0){
      green_array.push(rows[i]);
    }
    if (rows[i].Team=="Green Monkeys"){
      green_runs_array.push(i);
    }
  }

  for (let i=0; i < data.length; i++){
    if (rows[i].Team=="Orange Iguanas" && rows[i].Time_left!=0){
      orange_array.push(rows[i]);
    }
    if (rows[i].Team=="Orange Iguanas"){
      orange_runs_array.push(i);
    }
  }

  for (let i=0; i < data.length; i++){
    if (rows[i].Team=="Purple Parrots"){
      purple_runs_array.push(rows[i]);
    }
    if (rows[i].Team=="Purple Parrots" && rows[i].Time_left!=0){
      purple_array.push(i);
    }
  }

  for (let i=0; i < data.length; i++){
    if (rows[i].Team=="Silver Snakes" && rows[i].Time_left!=0){
      silver_array.push(rows[i]);
    }
    if (rows[i].Team=="Silver Snakes"){
      silver_runs_array.push(i);
    }
  }

  for (let i=0; i < data.length; i++){
      if (rows[i].Artifact_found==="yes"){
       Team_artifacts_found.push(rows[i]);
      }
  }

  for (let i=0; i < data.length; i++){
    if (rows[i].Time_left!=0){
     Team_time_array.push(rows[i].Time_left);
    }
    }   

  for (let k=0; k < data.length; k++){
    if (rows[k].Failure_Due_to=="Failed Escape"){
        Team_failed_escape.push(rows[k]);
    }
  }

  for (let k=0; k < data.length; k++){
    if (rows[k].Failure_Due_to=="Failed Acquisition"){
        Team_failed_acq.push(rows[k]);
    }
  }

  for (let k=0; k < data.length; k++){
    if (rows[k].Failure_Due_to=="Triple Seizure"){
        Team_triple_seizure.push(rows[k]);
    }
  }

  //For Win Times:
  var Team_time_sum=0;
  var Team_time_array=Team_time_array.map(function(time){
    return parseInt(time, 10);
  });
  for(var m in Team_time_array) { Team_time_sum += Team_time_array[m]; };

  Total=rows.length;
  Total_wins=red_array.length + blue_array.length + green_array.length + orange_array.length + purple_array.length + silver_array.length;

  d3.select(".panel-title").text(`Stats for: All Teams`);
  d3.select("#sample-metadata").append("h5").text(`Temple Runs: ${Total}`);
  d3.select("#sample-metadata").append("h5").text(`Temple Victories: ${Total_wins}`);
  d3.select("#sample-metadata").append("h5").text(`Temple Success Rate: ${((Total_wins/Total)*100).toFixed(2)}%`);
  d3.select("#sample-metadata").append("h5").text(`Artifact Found Rate: ${((Team_artifacts_found.length/Total)*100).toFixed(2)}%`);
  d3.select("#sample-metadata").append("h5").text(`Average Winning Time: ${((Team_time_sum/Total_wins).toFixed(2))} seconds`);

  d3.select("#team-metadata").append("h5").text(`Most Wins: ${silver_array.length} -> Silver Snakes, Green Monkeys`);
  d3.select("#team-metadata").append("h5").text(`Fewest Wins: ${purple_array.length} -> Purple Parrots`);
  d3.select("#team-metadata").append("h5").text(`Most Temple Runs: ${orange_runs_array.length} -> Orange Iguanas`);
  d3.select("#team-metadata").append("h5").text(`Fewest Temple Runs: ${purple_runs_array.length} -> Purple Parrots`);
  d3.select("#team-metadata").append("h5").text(`Best Win %: ${((silver_array.length/silver_runs_array.length)*100).toFixed(2)}% -> Silver Snakes`);
  d3.select("#team-metadata").append("h5").text(`Worst Win %: ${((orange_array.length/orange_runs_array.length)*100).toFixed(2)}% -> Orange Iguanas`);

  var trace={
    type: "pie",
    values: [Total_wins, Team_failed_escape.length, Team_failed_acq.length, Team_triple_seizure.length],
    labels: ['Successful Temple Run', 'Temple Run Failure: Failed Escape', 'Temple Run Failure: Failed Acquisition', 'Temple Run Failure: Triple Seizure'],
    pull: [0.1, 0, 0, 0, ],
    showlegend: false
    };
    var layout={
    title: { 
      text: "Temple Run Success",
      font: {
          color: "white",
          size: 24
      },
    },
    height: 600,
    width: 600,
    paper_bgcolor: "rgba(0,0,0,0)"
    };
    var data_graph=[trace];

  Plotly.newPlot('pie', data_graph, layout);

  //Guage Plot

  var degrees=180-((Team_time_sum/Total_wins).toFixed(2)), radius=.5;

  var radians=degrees*Math.PI/180;
  var x=radius*Math.cos(radians);
  var y=radius*Math.sin(radians);

  var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';

  var mainPath = path1, pathX = String(x), space = ' ', pathY =String(y), pathEnd = ' Z';
  var path = mainPath.concat(pathX,space,pathY,pathEnd);

  var data = [{ 
      type: 'scatter',
      x: [0], y:[0],
      marker: {size: 14, color:'rgb(255,0,0)'},
      showlegend: false,
      name: 'Seconds',
      text: `${((Team_time_sum/Total_wins).toFixed(2))} seconds`,
      hoverinfo: `text`},
      { values: [1,1,1,3],
  rotation: 90,
  text: [`2:01-3:00`, `1:01-2:00`, `0:00-1:00`, ''],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['rgb(0, 230, 0)','rgb(255,255,26)', 'rgb(255,70,70)','rgba(0,0,0,0)']},
  labels: [`First 60 Seconds`, `Middle 60 Seconds`, `Final 60 Seconds`, ``],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
  }];

  var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: 'rgb(255,0,0)',
      line: {
        color: 'rgb(255,0,0)'
      }
    }],
    title: { 
      text: "Average Winning Time",
      font: {
          color: "white",
          size: 24
      },
    },
  paper_bgcolor: "rgba(0,0,0,0)",
  plot_bgcolor: 'rgba(0,0,0,0)',
  //paper_bgcolor: "rgb(0, 0, 0)",
  height: 400,
  width: 400,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
  };

  Plotly.newPlot('gauge', data, layout, {displayModeBar: false});

  //Bubble plot

  var x = 30;
  var trace_bubble={
    x: [red_runs_array.length, blue_runs_array.length, green_runs_array.length, orange_runs_array.length, purple_runs_array.length, silver_runs_array.length],
    y: [red_array.length, blue_array.length, green_array.length, orange_array.length, purple_array.length, silver_array.length],
    text: ['Red Jaguars Victories', 'Blue Barracudas Victories', 'Green Monkeys Victories', 'Orange Iguanas Victores', 'Purple Parrots Victories', 'Silver Snakes Victories'],
    mode: 'markers',
    marker: {
      color: ['rgb(98,0,0)', 'rgb(35, 121, 233)', 'rgb(39, 82, 75)', 'rgb(218, 121, 4)', 'rgb(89,45,134)', 'rgb(212, 212, 212)'],
      opacity: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, ],
      size: [red_array.length*x, blue_array.length*x, green_array.length*x, orange_array.length*x, purple_array.length*x, silver_array.length*x]
      //size: [20,20,20,20,20,20]
    }
  };
  var data_bubble=[trace_bubble];

  var layout_bubble = {
      title: { 
        text: "Team Temple Runs vs Wins",
        font: {
            color: "white",
            size: 24
        },
      },
      images: [ 
        {
          x: .59,
          y: .3,
          sizex: 0.15,
          sizey: 0.15,
          source: "https://vignette.wikia.nocookie.net/legends/images/b/b8/Blue_Barracudas.jpg",
          xanchor: "right",
          xref: "paper",
          yanchor: "bottom",
          yref: "paper"
        },
        {
          x: .63,
          y: .198,
          sizex: 0.1,
          sizey: 0.1,
          source: "https://vignette.wikia.nocookie.net/legends/images/f/fe/Red_Jaguars.png",
          xanchor: "right",
          xref: "paper",
          yanchor: "bottom",
          yref: "paper"
        },
        {
          x: .88,
          y: .198,
          sizex: 0.1,
          sizey: 0.1,
          source: "https://vignette.wikia.nocookie.net/legends/images/8/85/Orange_Iguanas.jpg",
          xanchor: "right",
          xref: "paper",
          yanchor: "bottom",
          yref: "paper"
        },
        {
          x: .174,
          y: .085,
          sizex: 0.08,
          sizey: 0.08,
          source: "https://vignette.wikia.nocookie.net/legends/images/e/e8/Purple_Parrots.jpg",
          xanchor: "right", 
          xref: "paper",
          yanchor: "bottom",
          yref: "paper"
        },
        {
          x: .88,
          y: .66,
          sizex: 0.18,
          sizey: 0.18,
          source: "https://vignette.wikia.nocookie.net/legends/images/b/bc/Green_Monkeys.jpg",
          xanchor: "right",
          xref: "paper",
          yanchor: "bottom",
          yref: "paper"
        },
        {
          x: .67,
          y: .66,
          sizex: 0.18,
          sizey: 0.18,
          source: "https://vignette.wikia.nocookie.net/legends/images/9/9e/Silver_Snakes.jpg",
          xanchor: "right",
          xref: "paper",
          yanchor: "bottom",
          yref: "paper"
        }
      ],
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: 'rgba(0,0,0,0.5)',
    //paper_bgcolor: "rgb(0, 0, 0)",
    showlegend: false,
    height: 750,
    xaxis: { showline: true, color: "white", range: [8, 28], title: { text: "Temple Runs", font: {color: "white", size: 16}}, tickfont: { color: "white"}},
    yaxis: {  showline: true, color: "white", range: [2, 10],title: { text: "Temple Run Victories", font: {color: "white", size: 16}}, tickfont: { color: "white"}}
    };
  
    Plotly.newPlot('bubble', data_bubble, layout_bubble); //{displayModeBar: false});

})
}

//Variables declared manually, using different_selection as loop conditional.
function option_Team(different_selection){
// //This works if using: python -m http.server from command line
d3.csv("./static/js/Legends.csv", function(error, data) {
  if (error) return console.warn(error);

  if (different_selection=="All Teams"){
    init();
    }

  else{

  d3.select("#sample-metadata").html("");
  d3.select(".panel-title").html("Stats for: ");

  var rows = data;
  var team_array=[];
  var team_wins_array=[];
  var artifacts_found_array=[];
  var time_array=[];
  var failed_escape_array=[];
  var failed_acq_array=[];
  var triple_seizure_array=[];

  for (let i=0; i < data.length; i++){
    if (rows[i].Team==different_selection){
      team_array.push(rows[i]);
    }
  }
  for (let j=0; j < data.length; j++){
    if (rows[j].Team==different_selection && rows[j].Time_left!=0){
      time_array.push(rows[j].Time_left);
      team_wins_array.push(rows[j]);
    }
  }
  for (let k=0; k < data.length; k++){
    if (rows[k].Team==different_selection && rows[k].Artifact_found==="yes"){
      artifacts_found_array.push(rows[k]);
    }
  }
  for (let k=0; k < data.length; k++){
    if (rows[k].Team==different_selection && rows[k].Failure_Due_to=="Failed Escape"){
        failed_escape_array.push(rows[k].Failure_due_to=="Failed Escape");
    }
  }
  for (let k=0; k < data.length; k++){
    if (rows[k].Team==different_selection && rows[k].Failure_Due_to=="Failed Acquisition"){
        failed_acq_array.push(rows[k].Failure_due_to=="Failed Acquisition");
    }
  }
  for (let k=0; k < data.length; k++){
    if (rows[k].Team==different_selection && rows[k].Failure_Due_to=="Triple Seizure"){
        triple_seizure_array.push(rows[k].Failure_due_to=="Triple Seizure");
    }
  }

  var team_total_runs=team_array.length;
  var team_wins=team_wins_array.length;
  var artifacts_found=artifacts_found_array.length;
  var time_sum=0;
  
  var time_array=time_array.map(function(time){
    return parseInt(time, 10);
  });

  for(var m in time_array) { time_sum += time_array[m]; };


  d3.select(".panel-title").text(`Stats for: ${team_array[0].Team}`);
  d3.select("#sample-metadata").append("h5").text(`Temple Runs: ${team_total_runs}`);
  d3.select("#sample-metadata").append("h5").text(`Temple Victories: ${team_wins}`);
  d3.select("#sample-metadata").append("h5").text(`Temple Success Rate: ${((team_wins/team_total_runs)*100).toFixed(2)}%`);
  d3.select("#sample-metadata").append("h5").text(`Artifact Found Rate: ${((artifacts_found/team_total_runs)*100).toFixed(2)}%`);
  d3.select("#sample-metadata").append("h5").text(`Average Winning Time: ${((time_sum/time_array.length).toFixed(2))} seconds`);


  var trace={
      type: "pie",
      values: [team_wins, failed_escape_array.length, failed_acq_array.length, triple_seizure_array.length],
      labels: ['Successful Temple Runs', 'Temple Run Failure: Failed Escape', 'Temple Run Failure: Failed Acquisition', 'Temple Run Failure: Triple Seizure'],
      pull: [0.1, 0, 0, 0, ],
      showlegend: false
  };
  var layout={
      title: { 
        text: `Temple Run Success: ${team_array[0].Team}`,
        font: {
            color: "white",
            size: 24
        },
      },

      paper_bgcolor: "rgba(0,0,0,0)"
  };
  var data_graph=[trace];

  Plotly.newPlot('pie', data_graph, layout);

  //Guage Plot

  var degrees=180-((time_sum/time_array.length).toFixed(2)), radius=.5;

  var radians=degrees*Math.PI/180;
  var x=radius*Math.cos(radians);
  var y=radius*Math.sin(radians);

  var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';

  var mainPath = path1, pathX = String(x), space = ' ', pathY =String(y), pathEnd = ' Z';
  var path = mainPath.concat(pathX,space,pathY,pathEnd);

  var data = [{ 
      type: 'scatter',
      x: [0], y:[0],
      marker: {size: 14, color:'rgb(255,0,0)'},
      showlegend: false,
      name: 'Seconds',
      text: `${((time_sum/time_array.length).toFixed(2))} seconds`,
      hoverinfo: `text`},
      { values: [1,1,1,3],
  rotation: 90,
  text: [`2:01-3:00`, `1:01-2:00`, `0:00-1:00`, ''],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['rgb(0, 230, 0)','rgb(255,255,26)', 'rgb(255,70,70)','rgba(0,0,0,0)']},
  labels: [`First 60 Seconds`, `Middle 60 Seconds`, `Final 60 Seconds`, ``],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
  }];

  var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: 'rgb(255,0,0)',
      line: {
        color: 'rgb(255,0,0)'
      }
    }],
    title: { 
      text: "Average Winning Time",
      font: {
          color: "white",
          size: 24
      },
    },
  paper_bgcolor: "rgba(0,0,0,0)",
  plot_bgcolor: 'rgba(0,0,0,0)',
  //paper_bgcolor: "rgb(0, 0, 0)",
  height: 400,
  width: 400,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
  };

  Plotly.newPlot('gauge', data, layout, {displayModeBar: false});
};

});
};

//Dynamic variable storing after declaration
function option_Season(different_selection){
  d3.csv("./static/js/Legends.csv", function(error, data) {
    if (error) return console.warn(error);
  
    if (different_selection=="All Seasons"){
      init();
      }
    else{
      d3.select("#sample-metadata").html("");
      d3.select(".panel-title").html("Stats for: ");

      var rows = data;

      let season_runs1=[];
      let season_victory1=[];
      let season_artifact_found1=[];
      let season_failed_escape1=[];
      let season_failed_acq1=[];
      let season_triple_seizure1=[];
      let season_time_array1=[];
      let season_time_sum1=0;

      let season_runs2=[];
      let season_victory2=[];
      let season_artifact_found2=[];
      let season_failed_escape2=[];
      let season_failed_acq2=[];
      let season_triple_seizure2=[];
      let season_time_array2=[];
      let season_time_sum2=0;

      let season_runs3=[];
      let season_victory3=[];
      let season_artifact_found3=[];
      let season_failed_escape3=[];
      let season_failed_acq3=[];
      let season_triple_seizure3=[];
      let season_time_array3=[];
      let season_time_sum3=0;


    
    //Dynamic variable naming
    for (let j=1; j < 4; j++){
      for (let i=0; i < data.length; i++){
        if (rows[i].Season==j){
          eval("season_runs"+j+".push(rows["+i+"])");
        }
        if (rows[i].Season==j && rows[i].Time_left!=0){
          eval("season_victory"+j+".push(rows["+i+"])");
          eval("season_time_array"+j+".push(rows["+i+"].Time_left)");
          eval("season_time_array"+j+"=season_time_array"+j+".map(function(time){return parseInt(time, 10)})");
        }
        if (rows[i].Season==j && rows[i].Artifact_found=="yes"){
          eval("season_artifact_found"+j+".push(rows["+i+"])");
        }
        if (rows[i].Season==j && rows[i].Failure_Due_to=="Failed Escape"){
          eval("season_failed_escape"+j+".push(rows["+i+"])");
        }
        if (rows[i].Season==j && rows[i].Failure_Due_to=="Failed Acquisition"){
          eval("season_failed_acq"+j+".push(rows["+i+"])");
        }
        if (rows[i].Season==j && rows[i].Failure_Due_to=="Triple Seizure"){
          eval("season_triple_seizure"+j+".push(rows["+i+"])");
        }

    }
    }
  
    for (let j=1; j < 4; j++){
      eval("for(var m in season_time_array"+j+") { season_time_sum"+j+"+= season_time_array"+j+"[m];}");
    }

    d3.select(".panel-title").text(`Stats for: Season ${eval("season_runs"+different_selection+"[0].Season")}`);
    d3.select("#sample-metadata").append("h5").text(`Temple Runs: ${eval("(season_runs"+different_selection+").length")}`);
    d3.select("#sample-metadata").append("h5").text(`Temple Victories: ${eval("(season_victory"+different_selection+").length")}`);
    d3.select("#sample-metadata").append("h5").text(`Temple Success Rate: ${((eval("(season_victory"+different_selection+").length")/eval("(season_runs"+different_selection+").length"))*100).toFixed(0)}%`);
    d3.select("#sample-metadata").append("h5").text(`Artifact Found Rate: ${((eval("(season_artifact_found"+different_selection+").length")/eval("(season_runs"+different_selection+").length"))*100).toFixed(1)}%`);
    d3.select("#sample-metadata").append("h5").text(`Average Winning Time: ${((eval("(season_time_sum"+different_selection+")")/eval("(season_victory"+different_selection+").length"))).toFixed(2)} seconds`);

    var trace_season_pie={
      type: "pie",
      values: [eval("(season_victory"+different_selection+").length"), eval("(season_failed_escape"+different_selection+").length"), eval("(season_failed_acq"+different_selection+").length"), eval("(season_triple_seizure"+different_selection+").length")],
      labels: ['Successful Temple Runs', 'Temple Run Failure: Failed Escape', 'Temple Run Failure: Failed Acquisition', 'Temple Run Failure: Triple Seizure'],
      pull: [0.1, 0, 0, 0, ],
      showlegend: false
    };
    var layout_season_pie={
      title: { 
        text: `Temple Run Success: Season ${eval("season_runs"+different_selection+"[0].Season")}`,
        font: {
            color: "white",
            size: 24
        },
      },

      paper_bgcolor: "rgba(0,0,0,0)"
    };
    var data_season_pie=[trace_season_pie];

    Plotly.newPlot('pie', data_season_pie, layout_season_pie);

    //Guage Plot

    var degrees=180-(((eval("(season_time_sum"+different_selection+")")/eval("(season_victory"+different_selection+").length"))).toFixed(2)), radius=.5;

    var radians=degrees*Math.PI/180;
    var x=radius*Math.cos(radians);
    var y=radius*Math.sin(radians);

    var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';

    var mainPath = path1, pathX = String(x), space = ' ', pathY =String(y), pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [{ 
      type: 'scatter',
      x: [0], y:[0],
      marker: {size: 14, color:'rgb(255,0,0)'},
      showlegend: false,
      name: 'Seconds',
      text: `${((eval("(season_time_sum"+different_selection+")")/eval("(season_victory"+different_selection+").length"))).toFixed(2)} seconds`,
      hoverinfo: `text`},
      { values: [1,1,1,3],
    rotation: 90,
    text: [`2:01-3:00`, `1:01-2:00`, `0:00-1:00`, ''],
    textinfo: 'text',
    textposition:'inside',
    marker: {colors:['rgb(0, 230, 0)','rgb(255,255,26)', 'rgb(255,70,70)','rgba(0,0,0,0)']},
    labels: [`First 60 Seconds`, `Middle 60 Seconds`, `Final 60 Seconds`, ``],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
    }];

    var layout = {
    shapes:[{
      type: 'path',
      path: path,
      fillcolor: 'rgb(255,0,0)',
      line: {
        color: 'rgb(255,0,0)'
      }
    }],
    title: { 
      text: "Average Winning Time",
      font: {
          color: "white",
          size: 24
      },
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: 'rgba(0,0,0,0)',
    //paper_bgcolor: "rgb(0, 0, 0)",
    height: 400,
    width: 400,
    xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', data, layout, {displayModeBar: false});


  }
})
}

//Dynamic variable naming - least amount of code, most resource intensive
function option_Layout(different_selection){
  d3.csv("./static/js/Legends.csv", function(error, data) {
    if (error) return console.warn(error);
  
    if (different_selection=="All Layouts"){
      init();
      }
    else{
      d3.select("#sample-metadata").html("");
      d3.select(".panel-title").html("Stats for: ");

      var rows = data;

      var numerials=["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV"];

      for (let j = 1; j < 16; j++){
        eval("var Temple"+j+"_runs=[]");
        eval("var Temple"+j+"_victory=[]");
        eval("var Temple"+j+"_artifact_found=[]");
        eval("var Temple"+j+"_failed_escape=[]");
        eval("var Temple"+j+"_failed_acq=[]");
        eval("var Temple"+j+"_triple_seizure=[]");
        eval("var Temple"+j+"_time_array=[]");
        eval("var Temple"+j+"_time_sum=0");
      }

      for (let i=0; i < data.length; i++){
        if (rows[i].Temple_Layout==different_selection){
          eval("Temple"+different_selection+"_runs.push(rows["+i+"])");
        }
        if (rows[i].Temple_Layout==different_selection && rows[i].Time_left!=0){
          eval("Temple"+different_selection+"_victory.push(rows["+i+"])");
          eval("Temple"+different_selection+"_time_array.push(rows["+i+"].Time_left)");
          eval("Temple"+different_selection+"_time_array=Temple"+different_selection+"_time_array.map(function(time){return parseInt(time, 10)})");
          eval("Temple"+different_selection+"_time_array.map(function(time){return parseInt(time, 10)})");
          eval("Temple"+different_selection+"_time_array=Temple"+different_selection+"_time_array.filter(n => n)");
        }
        if (rows[i].Temple_Layout==different_selection && rows[i].Artifact_found=="yes"){
          eval("Temple"+different_selection+"_artifact_found.push(rows["+i+"])");
        }
        if (rows[i].Temple_Layout==different_selection && rows[i].Failure_Due_to=="Failed Escape"){
          eval("Temple"+different_selection+"_failed_escape.push(rows["+i+"])");
        }
        if (rows[i].Temple_Layout==different_selection && rows[i].Failure_Due_to=="Failed Acquisition"){
          eval("Temple"+different_selection+"_failed_acq.push(rows["+i+"])");
        }
        if (rows[i].Temple_Layout==different_selection && rows[i].Failure_Due_to=="Triple Seizure"){
          eval("Temple"+different_selection+"_triple_seizure.push(rows["+i+"])");
        }
      }

      eval("for(var n in Temple"+different_selection+"_time_array) { Temple"+different_selection+"_time_sum += Temple"+different_selection+"_time_array[n];}");

      d3.select(".panel-title").text(`Stats for: Temple Layout ${numerials[eval("Temple"+different_selection+"_runs[0].Temple_Layout")]} `);
      d3.select("#sample-metadata").append("h5").text(`Temple Runs: ${eval(("(Temple"+different_selection+"_runs).length"))}`);
      d3.select("#sample-metadata").append("h5").text(`Temple Victories: ${eval(("(Temple"+different_selection+"_victory).length"))}`);
      d3.select("#sample-metadata").append("h5").text(`Temple Success Rate: ${((eval(("(Temple"+different_selection+"_victory).length"))/eval("(Temple"+different_selection+"_runs).length"))*100).toFixed(2)}%`);
      d3.select("#sample-metadata").append("h5").text(`Artifact Found Rate: ${((eval(("(Temple"+different_selection+"_artifact_found).length"))/eval("(Temple"+different_selection+"_runs).length"))*100).toFixed(2)}%`);
      
      if ((eval(("(Temple"+different_selection+"_victory).length")))===0){
        d3.select("#sample-metadata").append("h5").text(`Average Winning Time: No Winners`);
      }
      else {
        d3.select("#sample-metadata").append("h5").text(`Average Winning Time: ${((eval(("(Temple"+different_selection+"_time_sum)"))/eval(("(Temple"+different_selection+"_victory).length")))).toFixed(2)} seconds`);
      }

    //pie graph

    var trace_layout_pie={
      type: "pie",
      values: [eval(("(Temple"+different_selection+"_victory).length")), eval(("(Temple"+different_selection+"_failed_escape).length")), eval(("(Temple"+different_selection+"_failed_acq).length")), eval(("(Temple"+different_selection+"_triple_seizure).length"))],
      labels: ['Successful Temple Runs', 'Temple Run Failure: Failed Escape', 'Temple Run Failure: Failed Acquisition', 'Temple Run Failure: Triple Seizure'],
      pull: [0.1, 0, 0, 0, ],
      textposition: 'inside', //Use this if any slices are small or 0.
      showlegend: false
    };
    var layout_layout_pie={
      title: { 
        text: `Temple Run Success: Temple Layout ${numerials[eval("Temple"+different_selection+"_runs[0].Temple_Layout")]}`,
        font: {
            color: "white",
            size: 24
        },
      },
      paper_bgcolor: "rgba(0,0,0,0)"
    };
    var data_layout_pie=[trace_layout_pie];

    Plotly.newPlot('pie', data_layout_pie, layout_layout_pie);

    //Gauge Plot

    if ((eval(("(Temple"+different_selection+"_victory).length")))===0){
      degrees=180, radius=.5;
      (eval(("(Temple"+different_selection+"_victory)=[1]")));  //Fixed for text for 0 victories in gauge plot.
    }
    else {
      var degrees=180-(((eval(("(Temple"+different_selection+"_time_sum)"))/eval(("(Temple"+different_selection+"_victory).length")))).toFixed(2)), radius=.5;
    }

    var radians=degrees*Math.PI/180;
    var x=radius*Math.cos(radians);
    var y=radius*Math.sin(radians);

    var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';

    var mainPath = path1, pathX = String(x), space = ' ', pathY =String(y), pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data_layout_gauge = [{ 
      type: 'scatter',
      x: [0], y:[0],
      marker: {size: 14, color:'rgb(255,0,0)'},
      showlegend: false,
      name: 'Seconds',  
      text: `${((eval(("(Temple"+different_selection+"_time_sum)"))/eval(("(Temple"+different_selection+"_victory).length")))).toFixed(2)} seconds`,
      hoverinfo: `text`},
      { values: [1,1,1,3],
    rotation: 90,
    text: [`2:01-3:00`, `1:01-2:00`, `0:00-1:00`, ''],
    textinfo: 'text',
    textposition:'inside',
    marker: {colors:['rgb(0, 230, 0)','rgb(255,255,26)', 'rgb(255,70,70)','rgba(0,0,0,0)']},
    labels: [`First 60 Seconds`, `Middle 60 Seconds`, `Final 60 Seconds`, ``],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
    }];

    var layout_layout_gauge = {
    shapes:[{
      type: 'path',
      path: path,
      fillcolor: 'rgb(255,0,0)',
      line: {
        color: 'rgb(255,0,0)'
      }
    }],
    title: { 
      text: "Average Winning Time",
      font: {
          color: "white",
          size: 24
      },
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: 'rgba(0,0,0,0)',
    //paper_bgcolor: "rgb(0, 0, 0)",
    height: 400,
    width: 400,
    xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', data_layout_gauge, layout_layout_gauge, {displayModeBar: false});    

    }
  })
}

//Dynamic variable naming
function option_Pendants(different_selection){
  d3.csv("./static/js/Legends.csv", function(error, data) {
    if (error) return console.warn(error);
  
    if (different_selection=="All"){
      init();
      }
    else{
      d3.select("#sample-metadata").html("");
      d3.select(".panel-title").html("Stats for: ");

      var rows = data;

      //Figure this out later for lists that are not in numerical order
      pendants_list=["0", "1", "1 1/2", "1 1/2 + 1/2", "2"];

      //1 => 1, 2 => 1.5, 3 => 1.1, 4 => 2
      for (let j = 1; j < 5; j++){
        eval("var Pendant"+j+"_runs=[]");
        eval("var Pendant"+j+"_victory=[]");
        eval("var Pendant"+j+"_artifact_found=[]");
        eval("var Pendant"+j+"_failed_escape=[]");
        eval("var Pendant"+j+"_failed_acq=[]");
        eval("var Pendant"+j+"_triple_seizure=[]");
        eval("var Pendant"+j+"_time_array=[]");
        eval("var Pendant"+j+"_time_sum=0");
      }

      //for (var k in pendants_list){
      //for (let j=1; j < 5; j++){
        for (let i=0; i < data.length; i++){
          if (rows[i].Pen_Dummy==different_selection){
            eval("Pendant"+different_selection+"_runs.push(rows["+i+"])");
          }
          if (rows[i].Pen_Dummy==different_selection && rows[i].Time_left!=0){
            eval("Pendant"+different_selection+"_victory.push(rows["+i+"])");
            eval("Pendant"+different_selection+"_time_array.push(rows["+i+"].Time_left)");
            eval("Pendant"+different_selection+"_time_array=Pendant"+different_selection+"_time_array.map(function(time){return parseInt(time, 10)})");
            eval("Pendant"+different_selection+"_time_array.map(function(time){return parseInt(time, 10)})");
            eval("Pendant"+different_selection+"_time_array=Pendant"+different_selection+"_time_array.filter(n => n)");
          }
          if (rows[i].Pen_Dummy==different_selection && rows[i].Artifact_found=="yes"){
            eval("Pendant"+different_selection+"_artifact_found.push(rows["+i+"])");
          }
          if (rows[i].Pen_Dummy==different_selection && rows[i].Failure_Due_to=="Failed Escape"){
            eval("Pendant"+different_selection+"_failed_escape.push(rows["+i+"])");
          }
          if (rows[i].Pen_Dummy==different_selection && rows[i].Failure_Due_to=="Failed Acquisition"){
            eval("Pendant"+different_selection+"_failed_acq.push(rows["+i+"])");
          }
          if (rows[i].Pen_Dummy==different_selection && rows[i].Failure_Due_to=="Triple Seizure"){
            eval("Pendant"+different_selection+"_triple_seizure.push(rows["+i+"])");
          }
          if (rows[i].Pen_Dummy==different_selection && rows[i].Failure_Due_to=="Triple Seizure"){
            eval("Pendant"+different_selection+"_time_array.push(rows["+i+"])");
          }
        }
      //}

      eval("for(var n in Pendant"+different_selection+"_time_array) { Pendant"+different_selection+"_time_sum += Pendant"+different_selection+"_time_array[n];}");

      d3.select(".panel-title").text(`Stats for: ${pendants_list[eval("Pendant"+different_selection+"_runs[0].Pen_Dummy")]} Pendent Runs`);
      d3.select("#sample-metadata").append("h5").text(`Temple Runs: ${eval(("(Pendant"+different_selection+"_runs).length"))}`);
      d3.select("#sample-metadata").append("h5").text(`Temple Victories: ${eval(("(Pendant"+different_selection+"_victory).length"))}`);
      d3.select("#sample-metadata").append("h5").text(`Temple Success Rate: ${((eval(("(Pendant"+different_selection+"_victory).length"))/eval("(Pendant"+different_selection+"_runs).length"))*100).toFixed(2)}%`);
      d3.select("#sample-metadata").append("h5").text(`Artifact Found Rate: ${((eval(("(Pendant"+different_selection+"_artifact_found).length"))/eval("(Pendant"+different_selection+"_runs).length"))*100).toFixed(2)}%`);
      d3.select("#sample-metadata").append("h5").text(`Average Winning Time: ${((eval(("(Pendant"+different_selection+"_time_sum)"))/eval(("(Pendant"+different_selection+"_victory).length")))).toFixed(2)} seconds`);

      //pie graph

      var trace_pendant_pie={
        type: "pie",
        values: [eval(("(Pendant"+different_selection+"_victory).length")), eval(("(Pendant"+different_selection+"_failed_escape).length")), eval(("(Pendant"+different_selection+"_failed_acq).length")), eval(("(Pendant"+different_selection+"_triple_seizure).length"))],
        labels: ['Successful Temple Runs', 'Temple Run Failure: Failed Escape', 'Temple Run Failure: Failed Acquisition', 'Temple Run Failure: Triple Seizure'],
        pull: [0.1, 0, 0, 0, ],
        textposition: 'inside', //Use this if any slices are small or 0.
        showlegend: false
      };
      var layout_pendant_pie={
        title: { 
          text: `Temple Run Success: ${pendants_list[eval("Pendant"+different_selection+"_runs[0].Pen_Dummy")]} Pendant Runs`,
          font: {
              color: "white",
              size: 23
          },
        },
        paper_bgcolor: "rgba(0,0,0,0)"
      };
      var data_pendant_pie=[trace_pendant_pie];
  
      Plotly.newPlot('pie', data_pendant_pie, layout_pendant_pie);

      //Gauge Plot

      var degrees=180-(((eval(("(Pendant"+different_selection+"_time_sum)"))/eval(("(Pendant"+different_selection+"_victory).length")))).toFixed(2)), radius=.5;

    var radians=degrees*Math.PI/180;
    var x=radius*Math.cos(radians);
    var y=radius*Math.sin(radians);

    var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';

    var mainPath = path1, pathX = String(x), space = ' ', pathY =String(y), pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data_pendant_gauge = [{ 
      type: 'scatter',
      x: [0], y:[0],
      marker: {size: 14, color:'rgb(255,0,0)'},
      showlegend: false,
      name: 'Seconds',
      text: `${((eval(("(Pendant"+different_selection+"_time_sum)"))/eval(("(Pendant"+different_selection+"_victory).length")))).toFixed(2)} seconds`,
      hoverinfo: `text`},
      { values: [1,1,1,3],
    rotation: 90,
    text: [`2:01-3:00`, `1:01-2:00`, `0:00-1:00`, ''],
    textinfo: 'text',
    textposition:'inside',
    marker: {colors:['rgb(0, 230, 0)','rgb(255,255,26)', 'rgb(255,70,70)','rgba(0,0,0,0)']},
    labels: [`First 60 Seconds`, `Middle 60 Seconds`, `Final 60 Seconds`, ``],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
    }];

    var layout_pendant_gauge = {
    shapes:[{
      type: 'path',
      path: path,
      fillcolor: 'rgb(255,0,0)',
      line: {
        color: 'rgb(255,0,0)'
      }
    }],
    title: { 
      text: "Average Winning Time",
      font: {
          color: "white",
          size: 24
      },
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: 'rgba(0,0,0,0)',
    //paper_bgcolor: "rgb(0, 0, 0)",
    height: 400,
    width: 400,
    xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', data_pendant_gauge, layout_pendant_gauge, {displayModeBar: false});

    }
  })
}
      
//Dynamic variable storing after declaration
function option_Solo(different_selection){
  d3.csv("./static/js/Legends.csv", function(error, data) {
    if (error) return console.warn(error);
  
    if (different_selection=="Both"){
      init();
      }
    else{
      d3.select("#sample-metadata").html("");
      d3.select(".panel-title").html("Stats for: ");

      var rows = data;

      let Team_runs=[];
      let Team_victory=[];
      let Team_artifact_found=[];
      let Team_failed_escape=[];
      let Team_failed_acq=[];
      let Team_triple_seizure=[];
      let Team_time_array=[];
      let Team_time_sum=0;

      let Solo_runs=[];
      let Solo_victory=[];
      let Solo_artifact_found=[];
      let Solo_failed_escape=[];
      let Solo_failed_acq=[];
      let Solo_triple_seizure=[];
      let Solo_time_array=[];
      let Solo_time_sum=0;

      for (let i=0; i < data.length; i++){
        if (rows[i].Solo==different_selection){
          eval(""+different_selection+"_runs.push(rows["+i+"])");
        }
        if (rows[i].Solo==different_selection && rows[i].Time_left!=0){
          eval(""+different_selection+"_victory.push(rows["+i+"])");
          eval(""+different_selection+"_time_array.push(rows["+i+"].Time_left)");
          eval(""+different_selection+"_time_array="+different_selection+"_time_array.map(function(time){return parseInt(time, 10)})");
          }
        if (rows[i].Solo==different_selection && rows[i].Artifact_found=="yes"){
          eval(""+different_selection+"_artifact_found.push(rows["+i+"])");
        }
        if (rows[i].Solo==different_selection && rows[i].Failure_Due_to=="Failed Escape"){
          eval(""+different_selection+"_failed_escape.push(rows["+i+"])");
        }
        if (rows[i].Solo==different_selection && rows[i].Failure_Due_to=="Failed Acquisition"){
          eval(""+different_selection+"_failed_acq.push(rows["+i+"])");
        }
        if (rows[i].Solo==different_selection && rows[i].Failure_Due_to=="Triple Seizure"){
          eval(""+different_selection+"_triple_seizure.push(rows["+i+"])");
        }
  
      }

      eval("for(var m in "+different_selection+"_time_array) { "+different_selection+"_time_sum += "+different_selection+"_time_array[m];}");

      d3.select(".panel-title").text(`Stats for: ${different_selection} Runs`);
      d3.select("#sample-metadata").append("h5").text(`Temple Runs: ${eval(("("+different_selection+"_runs).length"))}`);
      d3.select("#sample-metadata").append("h5").text(`Temple Victories: ${eval(("("+different_selection+"_victory).length"))}`);
      d3.select("#sample-metadata").append("h5").text(`Temple Success Rate: ${((eval(("("+different_selection+"_victory).length"))/eval("("+different_selection+"_runs).length"))*100).toFixed(2)}%`);
      d3.select("#sample-metadata").append("h5").text(`Artifact Found Rate: ${((eval(("("+different_selection+"_artifact_found).length"))/eval("("+different_selection+"_runs).length"))*100).toFixed(2)}%`);
      d3.select("#sample-metadata").append("h5").text(`Average Winning Time: ${((eval(("("+different_selection+"_time_sum)"))/eval(("("+different_selection+"_victory).length")))).toFixed(2)} seconds`);

      var trace_solo_pie={
        type: "pie",
        values: [eval(("("+different_selection+"_victory).length")), eval(("("+different_selection+"_failed_escape).length")), eval(("("+different_selection+"_failed_acq).length")), eval(("("+different_selection+"_triple_seizure).length"))],
        labels: ['Successful Temple Runs', 'Temple Run Failure: Failed Escape', 'Temple Run Failure: Failed Acquisition', 'Temple Run Failure: Triple Seizure'],
        pull: [0.1, 0, 0, 0, ],
        textposition: 'inside', //Use this if any slices are small or 0.
        showlegend: false
      };
      var layout_solo_pie={
        title: { 
          text: `Temple Run Success: ${different_selection} Runs`,
          font: {
              color: "white",
              size: 24
          },
        },
        paper_bgcolor: "rgba(0,0,0,0)"
      };
      var data_solo_pie=[trace_solo_pie];
  
      Plotly.newPlot('pie', data_solo_pie, layout_solo_pie);

      //Guage Plot

    var degrees=180-(((eval(("("+different_selection+"_time_sum)"))/eval(("("+different_selection+"_victory).length")))).toFixed(2)), radius=.5;

    var radians=degrees*Math.PI/180;
    var x=radius*Math.cos(radians);
    var y=radius*Math.sin(radians);

    var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';

    var mainPath = path1, pathX = String(x), space = ' ', pathY =String(y), pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [{ 
      type: 'scatter',
      x: [0], y:[0],
      marker: {size: 14, color:'rgb(255,0,0)'},
      showlegend: false,
      name: 'Seconds',
      text: `${((eval(("("+different_selection+"_time_sum)"))/eval(("("+different_selection+"_victory).length")))).toFixed(2)} seconds`,
      hoverinfo: `text`},
      { values: [1,1,1,0],
    rotation: 90,
    text: [`2:01-3:00`, `1:01-2:00`, `0:00-1:00`, ''],
    textinfo: 'text',
    textposition:'inside',
    marker: {colors:['rgb(0, 230, 0)','rgb(255,255,26)', 'rgb(255,70,70)','rgba(0,0,0,0)']},
    labels: [`First 60 Seconds`, `Middle 60 Seconds`, `Final 60 Seconds`, ``],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
    }];

    var layout = {
    shapes:[{
      type: 'path',
      path: path,
      fillcolor: 'rgb(255,0,0)',
      line: {
        color: 'rgb(255,0,0)'
      }
    }],
    title: { 
      text: "Average Winning Time",
      font: {
          color: "white",
          size: 24
      },
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: 'rgba(0,0,0,0)',
    //paper_bgcolor: "rgb(0, 0, 0)",
    height: 400,
    width: 400,
    xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', data, layout, {displayModeBar: false});

  }
  })
}
    

init();