window.IconRect = new Rect(4, 72, 64, 64);
IconRect.padding = IconRect.x;
IconRect.offset  = IconRect.y;

window.IconsetImage = new Image();
IconsetImage.src = "assets/icons.png"
IconsetImage.RawCount = 9;

window.keystate = {};
window.addEventListener("keydown", (event)=>{window.keystate[event.key] = true;})
window.addEventListener("keyup", (event)=>{window.keystate[event.key] = false;})

function start(){
  window.equipment_box = document.getElementById("equipment_box");
  window.ingrident_box = document.getElementById("ingrident_box");
  window.Tooltip = document.getElementById("tooltip-popup");
  window.TooltipMID = document.getElementById("tooltip-mid");
  window.TooltipHead = document.getElementById("tooltip-head");
  window.TooltipBody = document.getElementById("tooltip-body");
  window.craftGrid = [document.getElementById("grid-result")]
  for(let i=1;i<10;++i){
    let gid = `grid-${i}`
    window.craftGrid[i] = document.getElementById(gid);
  }
  $(Tooltip).hide();
  window.addEventListener("mousemove", (event)=>{
    if(is_tooltop_hide_needed(event.clientX, event.clientY)){$(Tooltip).hide();}
  }, null);
  load_jsons();
}

window.addEventListener("load", start, null);

function register_hovers(){
  $(".grid, .grid-large").mouseenter(
    (event)=>{
      let target = event.target;
      if(!target.firstChild){
        target = $(event.target).parent()[0];
      }
      let headdiv = target.children[1].children[0];
      if(!headdiv){return ;}
      let bodydiv = headdiv.children[0];
      if(!bodydiv){return ;}
      let header  = headdiv.innerHTML.split("<div")[0].split("::");
      header[0] = header[0].trim()
      if(!header[0]){return ;}
      $(Tooltip).show();
      $(TooltipHead).text(header[0]);
      $(TooltipMID).text(header[1]);
      TooltipBody.innerHTML = bodydiv.innerHTML;
      let wx = Math.max(Math.min(event.clientX + 4, window.innerWidth - $(Tooltip).width() - 8), 0);
      let wy = Math.max(Math.min(event.clientY + 4, window.innerHeight - $(Tooltip).height() - 8), 0);
      $(Tooltip).css({top: `${wy}px`, left: `${wx}px`})
      $(TooltipBody).show();
    }
  );

  $(".grid").mouseleave(
    (event)=>{
      $(Tooltip).hide();
      let wx = Math.max(Math.min(event.clientX + 4, window.innerWidth - $(Tooltip).width() - 4), 0);
      let wy = Math.max(Math.min(event.clientY + 4, window.innerHeight - $(Tooltip).height() - 4), 0);
      $(Tooltip).css({top: `${wy}px`, left: `${wx}px`})
    }
  );
}

function is_tooltop_hide_needed(cx, cy){
  if(is_tooltip_in_items_area(cx, cy) ||
     is_tooltip_in_craft_area(cx, cy)){return false;}
  return true;
}

function is_tooltip_in_items_area(cx, cy){
  let erect = equipment_box.getBoundingClientRect();
  let irect = ingrident_box.getBoundingClientRect();
  let bot = Math.max(erect.bottom, irect.bottom);
  if(cy < erect.top){return false;}
  if(cy > bot){return false;}
  if(cx < erect.left){return false;}
  if(cx > irect.right){return false;}
  if(cx > erect.right && cx < irect.left){return false;}
  return true;
}

function is_tooltip_in_craft_area(cx, cy){
  let urect = craftGrid[7].getBoundingClientRect();
  let drect = craftGrid[3].getBoundingClientRect();
  let erect = craftGrid[0].getBoundingClientRect();
  if(erect.left < cx && cx < erect.right &&
     erect.top  < cy && cy < erect.bottom){
       return true;
  }
  if(cy < urect.top){return false;}
  if(cy > drect.bottom){return false;}
  if(cx < urect.left){return false;}
  if(cx > drect.right){return false;}
  return true;
}

function json_load_ok(){
  register_hovers();
}

function load_jsons(){
  window.json_loading_cnt = 3;
  processJSON("json/equipment_data.json", (dat)=>{
    window.equipment_data = JSON.parse(dat);  
    ItemManager.create_equpiments();
    var body = document.body,
    html = document.documentElement;

    window.docHeight = Math.max( body.scrollHeight, body.offsetHeight, 
      html.clientHeight, html.scrollHeight, html.offsetHeight );
    window.docWidth = Math.max( body.scrollWidth, body.offsetWidth, 
      html.clientWidth, html.scrollWidth, html.offsetWidth );
      window.json_loading_cnt -= 1;
  });


  processJSON("json/item_data.json", (dat)=>{
    window.item_data = JSON.parse(dat);  
    ItemManager.create_items();
    var body = document.body,
    html = document.documentElement;

    window.docHeight = Math.max( body.scrollHeight, body.offsetHeight, 
      html.clientHeight, html.scrollHeight, html.offsetHeight );
    window.docWidth = Math.max( body.scrollWidth, body.offsetWidth, 
      html.clientWidth, html.scrollWidth, html.offsetWidth );
      window.json_loading_cnt -= 1;
  });

  processJSON("json/recipes.json", (dat)=>{
    window.recipe_data = JSON.parse(dat);
    window.json_loading_cnt -= 1;
  });

  chkjson_func = function(){
    if(window.json_loading_cnt == 0){json_load_ok()}
    else{setTimeout(chkjson_func, 300)}
  };
  setTimeout(chkjson_func, 300);
}

function preventDrag(event){
  if(event.type=='dragenter' || event.type=='dragover' || event.type=='drop'){
    if(event.stopPropagation){
      event.preventDefault();
      event.stopPropagation();
    }
    return false;
  }
}