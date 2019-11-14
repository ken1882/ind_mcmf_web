function load_jsons(){
  processJSON("json/changelog.json", (dat)=>{
    dat = JSON.parse(dat);
    let log = $("#changelog");
    let len = dat.length;
    for(let i=len-1;i>=0;--i){
      let info = dat[i];
      let ele = document.createElement("li");
      ele.innerHTML = `${info['version']}: ${info['desc']}`;
      log.append(ele);
      log.append(document.createElement("br"));
    }
  });

  processJSON("json/commands.json", (dat)=>{
    dat = JSON.parse(dat);
    let cmds = $("#command_table");
    let len = dat.length;
    for(let i=0;i<len;++i){
      let ele = document.createElement("tr");
      let th_cmd = document.createElement("td");
      let th_desc = document.createElement("td");
      th_cmd.innerHTML = `/${dat[i].command}`;
      th_desc.innerHTML = `${dat[i].usage}`;
      ele.appendChild(th_cmd);
      ele.appendChild(th_desc);
      cmds.append(ele);
    }
  });
}

function start(){
  load_jsons();
}

window.addEventListener("load", start, false);