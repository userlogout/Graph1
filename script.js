var adj = new Map();
var visited = [];
var level = [];
var nodesInEachLevel = new Map();
var leafNodes = [];
var maxLevel = 0;
const maxWidth = 1000; //parseInt(document.getElementById("svgArea").style.width); приводится к инту
const maxHeight = 1000; //parseInt(document.getElementById("svgArea").style.height); приводится к инту
var parent = [];
var dfsPath = [];
var bfsPath = [];
var activeDeleteEdge = false;

class Initialize {
  static all() {
    //reset all variables
    visited = [];
    level = [];
    nodesInEachLevel = new Map();
    leafNodes = [];
    maxLevel = 0;
    parent = [];
    dfsPath = [];
    bfsPath = [];
  }

  static resetNodeColors() {
    var nodes = document.getElementsByClassName("node");
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].setAttribute("fill", "green");
    }
  }
}

/////////////////////////
/////////////////////////
/////////////////////////
/////////////////////////
//Functions

var g;
function createGraph(n, m, uv, root) {
  Initialize.all();
  g = new Graph(n, root);
  adj = new Map();
  for (let i = 1; i <= n; i++) {
    g.addVertex(i);
  }
  for (let i = 0; i < m; i++) {
    let u = uv[i][0],
      v = uv[i][1];
    //console.log(u, v);
    g.addEdge(u, v);
  }
  g.bfs(root);
  g.dfs(root);
  g.getNodesInEachLevel(root);
  g.getLeafNodes();

  document.getElementById("svgArea").innerHTML = "";
  Draw.drawNodes();
  Draw.drawEdges(uv);
  Draw.deleteAllNodes();
  Draw.drawNodes();
}

function getNodeProperties(node) {
  let parent = parent[node];
  let level = level[node];
  let num_child = adj.get(node);
  num_child.splice(num_child.indexOf(parent), 1);

  console.log(parent, level, num_child);
}

function getInput(root) {
  let ip = document.getElementById("input").value;
  ip = ip.split("\n");
  let nm = ip[0].split(" ").map(Number);
  let uv = [];
  for (let i = 1; i < ip.length; i++) {
    uv.push(ip[i].split(" ").map(Number));
  }
  createGraph(nm[0], nm[1], uv, root);
}

/////////////////////////
/////////////////////////
/////////////////////////
/////////////////////////
//Click Events
document.getElementById("run").onclick = () => {
  getInput(1);
  Animate.initialize();
  Initialize.resetNodeColors();
  Animate.initialize();
};

document.getElementById("dfs").onclick = () => {
  Animate.initialize();
  Initialize.resetNodeColors();
  setTimeout(() => {
    Animate.dfs(0);
  }, 400);
  console.log(dfsPath);
};

document.getElementById("bfs").onclick = () => {
  Animate.initialize();
  Initialize.resetNodeColors();
  setTimeout(() => {
    Animate.bfs(0);
  }, 400);
};

document.getElementById("changeRoot").onclick = () => {
  let r = document.getElementById("newRoot").value;
  r = parseInt(r);
  getInput(r);
};

//кнопка для проверки dfs
document.getElementById("dfsPath1").onclick = () => {
  let r1 = "" + document.getElementById("input1").value;
  let r2 = "";
  for (let i = 0; i<dfsPath.length; i++) {
    r2+=dfsPath[i];
    if (i<dfsPath.length-1) {
      r2+=" ";
    }
  }
  if (r1==r2 && r2!="" && r1!="") {
    $("#textGraph").text("Верно");
  } else {
    $("#textGraph").text("Неверно");
  } 
  // console.log(r1);
};

//кнопка для проверки bfs
//берется айди кнокпки
document.getElementById("bfsPath1").onclick = () => {
  //записывается порядок обхода графа бфс через пробел 
  let r3 = "" + document.getElementById("input1").value;
  let r4 = "";
  for (let i = 0; i<dfsPath.length; i++) {
    //по длине всех вершин
    //записывается в р4 вершины
    r4+=dfsPath[i];
    if (i<dfsPath.length-1) {
      r4+=" ";
    }
  }
  //здесь происходит сравнение
  if (r3==r4 && r4!="" && r3!="") {
    $("#textGraph").text("Верно");
  } else {
    $("#textGraph").text("Неверно");
  } 
  // console.log(r1);
};



document.getElementById("deleteEdge").onclick = () => {};
document.getElementById("check").onclick = () => {};

/* 
  Error : Not able to show full view in case of depth of leaves increases(like upto 8)
*/
/*
  Graph Algorithms
  Adding weighted edges
  Dijiktras
*/
