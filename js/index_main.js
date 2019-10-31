function load_jsons(){
  processJSON("json/changelog.json", (dat)=>{
    dat = JSON.parse(dat);
    let log = $("#changelog");
    let len = dat.length;
    for(let i=len-1;i>=0;--i){
      let info = dat[i];
      let ele = document.createElement("li");
      $(ele).text(`${info['version']}: ${info['desc']}`)
      log.append(ele);
    }
  });
}

function start(){
  load_jsons();
}

window.addEventListener("load", start, false);