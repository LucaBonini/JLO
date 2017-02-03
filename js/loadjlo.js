function drawgraph(dati){

    var w = window.innerWidth;
    var h = window.innerHeight;
  var svg=d3.select("svg").attr("width",w).attr("height",h);


  d3.selectAll("svg > *").remove();
    

//var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation() //applicato a un array vuoto
    .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(180)) 
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(w / 2, h / 2))
    .force("collide",d3.forceCollide(50).iterations(13) );
 


d3.json(dati, function(error, graph) {
  if (error) throw error;


var regex= /.+:/;

    function css_class2string(css_classes) {
    css = "";
    graph.css_classes.forEach(function(entry) {
      // NB: effettuare check formate. Es:
      if (!("classname" in entry)) {
        alert("JSON non valido: MANCA NOME CLASSE CSS.");
      }
      classname = "";
      css_arr = [];
      for (var key in entry) {
        if (key == "classname") {
          classname = entry[key];
        } else {
          value = entry[key];
          css_arr.push(key.replace(/_/g,"-") + ": " + value);
        }
      }
      css += "." + classname + " { " + css_arr.join("; ") + " }\n";
      
    });
    return css;
  }
  




  d3.select("style")
    .text(css_class2string(graph.css_classes));





  svg.append("defs").selectAll("marker")
    .data(graph.links)
  .enter().append("marker")
    .attr("id", function(d,i){
      return d.source+i;
    })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 16)
    .attr("refY", 0)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .attr("fill",function(d){
      return d.sstyle[0].fill;
    })
    .attr("class",function(d){
      return d.cssclass;
    })
  .append("path")
    .attr("d", "M0,-5L10,0L0,5");
    

  var scalecircle=d3.scaleQuantize()
    .domain([0,60])
    .range([15,30,45,60]);

  var scaleellipse=d3.scaleQuantize()
    .domain([0,40])
    .range([10,20,30,40]);

  var scalerect=d3.scaleQuantize()
    .domain([0,60])
    .range([15,30,45,60]);

  var scalepolygon= d3.scaleQuantize()
      .domain([0,60])
      .range([1,2,3,4])

  var link = svg.append("g")
    .attr("class", "links")
  .selectAll("g") 
  .data(graph.links) 
  .enter().append("g")
    .attr("style", "font-family: 'lato','Helvetica Neue',Helvetica,Arial,sans-serif;font-size: 15px; line-height: 1.42857;")
    .append("line")
    .attr("style","stroke-opacity:1;stroke-width:3;")
    .attr("stroke",function(d){
      return d.sstyle[0].fill;
    })
    .attr("stroke-dasharray",function(d){
      if(d.sstyle[0].stroke_dasharray!="none"){
        return d.sstyle[0].stroke_dasharray;
      }
      else{
        return "0"
      }

    })


    .attr("class",function(d){
      return d.cssclass;
    })
    .attr("marker-end",function(d,i){
      return 'url(#'+d.source+i+')';
    }); 

  var tip = d3.tip()
  .attr("class", "d3-tip")
  .attr("background","blue")
  .attr("font-size","10px")
  .offset([-10, 0])
  .html(function(d) {
    return d.label[0].id;
  });

    var tip_nodes = d3.tip()
  .attr("class", "d3-tip")
  .attr("background","blue")
  .attr("font-size","10px")
  .offset([-10, 0])
  .html(function(d) {
    if (d.popup_mo=="resource"){
      return decodeURIComponent(d.id);
    }
    else {
      return d.comment;
    }
    
  });

var polygon1="15,1.25 5.625,17.5 -13.875,17.5 -22.5,1.25 -13.875,-15 5.625,-15 "
var polygon3="45,3.725 16.875,52.5 -41.625,52.5 -67.5,3.75 -41.625,-45 16.875,-45"
var polygon2="30,2.5 11.25,35 -27.75,35 -45,2.5 -27.75,-30 11.25,-30"
var polygon4= "60,5 22.5,70 -55.5,70 -90,5 -55.5,-60 22.5,-60"

svg.call(tip);
  

  var node = svg.append("g") 
      .attr("class", "nodes")
    .selectAll("g")
    .data(graph.nodes) //dati json sezione "nodes"
    .enter().append("g")
    //.attr("style","color: #2c3e50;font-family: 'lato','Helvetica Neue',Helvetica,Arial,sans-serif;font-size: 15px; line-height: 1.42857;")
      .append(function(d){
        if(d.shape=="circle")
          {return document.createElementNS('http://www.w3.org/2000/svg', 'circle')}
        if(d.shape=="rect")
          {return document.createElementNS('http://www.w3.org/2000/svg', 'rect')}
        if(d.shape=="ellipse")
          {return document.createElementNS('http://www.w3.org/2000/svg', 'ellipse')}
        if(d.shape=="polygon")
          {return document.createElementNS('http://www.w3.org/2000/svg', 'polygon')}
      })
      .attr("id",function(d){
        return d.label.replace(/_|-|'| /g,".");
      })
     .attr("fill", function(d) { 
          return d.sstyle[0].fill;       
       
      })

     
     .attr("stroke",function(d){
      return d.sstyle[0].stroke;
     })
     .attr("stroke-width",function(d){
       return d.sstyle[0].stroke_width;
     })
     .attr("class",function(d){
      if(d.sstyle[0].cssclass!="none"){
        return d.cssclass;
      }
      else{
        return ""
      }
      

      })
     .attr("stroke-dasharray",function(d){
      if(d.sstyle[0].stroke_dasharray!="none"){
        return d.sstyle[0].stroke_dasharray;
      }
      else {
        return "0"
      }
     })
    

     .on("mouseover", function(d) {
       if(d.mouseover=="fill"){
          d3.select(this).attr("fill", function(d){
            return (d.color_mo);
          });

       }
        else(d3.select(this).attr("stroke-width",function(d){
          return (d.sstyle[0].stroke_width*3);
          })
        )
        tip_nodes.show(d);

      })
     .on("mouseout", function(d) {
       if(d.mouseover=="fill"){
          d3.select(this).attr("fill", function(d){
            return d.sstyle[0].fill
          });
        }
        else( 
          d3.select(this).attr("stroke-width",function(d){
            return d.sstyle[0].stroke_width
          })
          )
          tip_nodes.hide(d);  
      });

node.call(tip_nodes);

var lab = svg.append("g") 
    .attr("class", "labels")
  .selectAll("g")
  .data(graph.links) 
  .enter().append("g")
    .append("rect")
    .attr("id",function(d,i){
      return d.label[0].id.replace(regex,"" )+i;
    })
    .attr("stroke",function(d){
      return d.label[0].stroke;
    })
    .attr("stroke_dasharray",function(d){
      return d.label[0].stroke_dasharray;
    })
    .attr("height", 16)
    .attr("width",70)
    .attr("fill", function(d){
      return d.label[0].fill;
    })
    .attr("x", -35)
    .attr("y", -12)
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);



    d3.select(".nodes").selectAll("ellipse")
      .attr("cx",0)
      .attr("cy",0)
      .attr("cursor","pointer")
      .attr("rx",function(d){
        return(scaleellipse(d.size)*(5/2));
      })
      .attr("ry",function(d){
        return(scaleellipse(d.size));
      })
      .attr("cursor","pointer");

    d3.select(".nodes").selectAll("circle")
      .attr("r",function(d){
        return(scalecircle(d.size));
      })
      
      .attr("cursor","pointer");

    d3.select(".nodes").selectAll("rect")
      .attr("height",function(d){
        return(scalerect(d.size));
      })
      .attr("width",function(d){
        return(scalerect(d.size)*4);
      })
      .attr("x",function(d){
        return -(scalerect(d.size)*4)/2;
      })
      .attr("y",-14)
      .attr("cursor","pointer");

    d3.select(".nodes").selectAll("polygon")
      .attr("points",function(d){
        if(scalepolygon(d.size)==1){
          return polygon1;
        }
        if(scalepolygon(d.size)==2){
          return polygon2;
        }
        if(scalepolygon(d.size)==3){
          return polygon3;
        }
        if(scalepolygon(d.size)==4){
          return polygon4;
        }

      })
      .attr("x",-40)
        .attr("y",-14);
      
     
    d3.select(".nodes").selectAll("g")
        .call(d3.drag()  //funzione che regola il drag aka lo spostamento dei cerchi
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));   

    d3.select(".nodes").selectAll("g").append("clipPath")
        .attr("id", function(d) { return "clip-"+d.label.replace(/_|-|\s|'/g,"."); })
      .append("use")
        .attr("xlink:href", function(d) { return "#"+d.label.replace(/_|-|\s|'/g,"."); });


    d3.select(".nodes").selectAll("g")

      .on("click",function(d){
        window.open(d.id);
      })
      .append("text")
      .attr("clip-path", function(d) { return "url(#clip-" + d.label.replace(/_|-|\s|'/g,".") + ")"; })
      .attr("style","font-family:sans-serif;font-size:8px;text-anchor:middle;")
      //.attr("dy",".35em")
      .attr("stroke",function(d){
        return d.sstyle[0].text_color;
      })
      .append("tspan")
      .attr("x", function(d){
        if(d.shape=="polygon"){
          return -10;
        }
        else{
          return 0;
        }
      })
      .attr("y", 3)

      .text(function(d) { 
        return d.label.replace(/_/g," ")});


     d3.select(".labels").selectAll("g").append("clipPath")
    .attr("id", function(d,i) { var stryng =d.label[0].id.replace(/\s/g,".");
      return "clip-"+stryng.replace(regex,"" )+i; })
  .append("use")
    .attr("xlink:href", function(d,i) { return "#"+d.label[0].id.replace(regex,"" )+i; });
      
      d3.select(".labels").selectAll("g").
      append("text")
      .attr("clip-path", function(d,i) { 
        var stryng =d.label[0].id.replace(/\s/g,".");
        return "url(#clip-" + stryng.replace(regex,"" )+i; })
      .attr("style","font: 0.75em sans-serif;text-anchor: middle;fill:black;")
      .text(function(d,i) { return d.label[0].id.replace(regex,"" )});


  simulation
      .nodes(graph.nodes)
      .on("tick", ticked); 


  simulation.force("link")
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) {
        if(d.direction=="forward") 
          return (d.source.x);
        else
         return (d.target.x)
     })
        .attr("y1", function(d) { 
        if(d.direction=="forward") 
            return (d.source.y)
        else
         return (d.target.y )
     })
        .attr("x2", function(d) { 
          if(d.direction=="forward")
            return (d.target.x)
        else
          return (d.source.x) })
        .attr("y2", function(d) { 
          if(d.direction=="forward")
            return (d.target.y)
        else
          return (d.source.y) });

    d3.select(".nodes").selectAll("g")
        .attr("transform", function (d) {return "translate(" + d.x + "," + d.y + ")";
    });


     d3.selectAll(".labels").selectAll("g")
        .attr("transform", function (d) {return "translate(" + (d.source.x+d.target.x)/2 + "," + ((d.source.y+d.target.y )/2)+ ")";
    });
  }
});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.2).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(-0.1);
  d.fx = null;
  d.fy = null;
}
}