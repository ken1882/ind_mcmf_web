class ItemManager{

  constructor(..._){
    throw "This is a static class"
  }
  
  static get_item_desc(inf){
    let ret = "";
    if(!!inf['desc']){
      ret += inf['desc'] + "\n<br>";
    }
    if(!!inf['gun-type']){
      ret += "<span class=\"item-attribute\">Type: </span>" + inf['gun-type'] + "\n<br>";
    }
    if(!!inf['damage']){
      ret += "<span class=\"item-attribute\">Damage: </span>" + inf['damage'] + "\n<br>";
    }
    if(!!inf['cartridge']){
      ret += "<span class=\"item-attribute\">Cartridge: </span>" + inf['cartridge'] + "\n<br>";
    }
    if(!!inf['rate']){
      ret += "<span class=\"item-attribute\">Fire Rate: </span>" + inf['rate'] + "\n<br>";
    }
    if(!!inf['magazines']){
      let mags = inf['magazines'], len = mags.length;
      ret += "<span class=\"item-attribute\">Magazines:\n</span><br>";
      for(let i=0;i<len;++i){
        ret += "" + mags[i] + "\n<br>";
      }
    }
    return ret;
  }

  static push_new_equipment(id, src){
    id = parseInt(id);
    let inf = this.get_equipment_info(id);
    let desc = this.get_item_desc(inf);
    let raw_html = `<div class="container"><span class="grid" name=${inf['mid']}>
      <img src=${src} alt class="item-img" draggable="true" ondragstart="ItemManager.on_drag_start(event)">
      <div class="mc-tooltip">
        <div class="mc-tooltip-title">${inf['name']}::${inf['mid']}
          <div class="mc-tooltip-description">${desc}</div>
        </div>
      </div>
      </span></div>`
    let div = document.createElement("div");
    div.innerHTML = raw_html.trim();
    window.equipment_box.appendChild(div.firstChild);
  }

  static push_new_item(id, src){
    id = parseInt(id);
    let inf = this.get_item_info(id);
    let desc = this.get_item_desc(inf);
    let raw_html = `<div class="container"><span class="grid" name=${inf['mid']}>
      <img src=${src} alt class="item-img" draggable="true" ondragstart="ItemManager.on_drag_start(event)">
      <div class="mc-tooltip">
        <div class="mc-tooltip-title">${inf['name']}::${inf['mid']}
          <div class="mc-tooltip-description">${desc}</div>
        </div>
      </div>
      </span></div>`
    let div = document.createElement("div");
    div.innerHTML = raw_html.trim();
    window.ingrident_box.appendChild(div.firstChild);
  }

  static get_equipment_info(id){
    return window.equipment_data.find(obj => {return obj.id == id});
  }

  static get_item_info(id){
    return window.item_data.find(obj => {return obj.id == id});
  }

  static create_equpiments(){
    let len = equipment_data.length;
    for(let i=0;i<len;++i){
      let id = equipment_data[i]['id'];
      let bmp = new Bitmap(0, 0, 64, 64);
      bmp.drawIcon(id, 0, 0);
      this.push_new_equipment(id, bmp.canvas.toDataURL());
    }
  }

  static create_items(){
    let len = item_data.length;
    for(let i=0;i<len;++i){
      let id = item_data[i]['id'];
      let bmp = new Bitmap(0, 0, 64, 64);
      bmp.drawIcon(id, 0, 0);
      this.push_new_item(id, bmp.canvas.toDataURL());
    }
  }

  static on_craft_drag_start(event){
    let subject = event.target;
    if(subject.tagName == "IMG"){
      subject = subject.parentNode;
    }
    if(!$(subject).attr('name')){return event.preventDefault();}
    window.flagDragFromCraft = true;
    window.dragSubject = subject;
    $(Tooltip).hide();
  }

  static on_drag_start(event){
    let subject = event.target;
    if(subject.tagName == "IMG"){
      subject = subject.parentNode;
    }
    if(!$(subject).attr('name')){return event.preventDefault();}
    window.dragSubject = subject;
    window.flagDragFromCraft = false;
    $(Tooltip).hide();
  }

  static on_drag_over(event){
    event.preventDefault();
  }

  static on_drag_drop(event){
    if(!$(dragSubject).attr('name')){return event.preventDefault();}
    
    let target = event.target;

    if(target.tagName == 'IMG'){
      target = target.parentNode;
    }
    else if(target.tagName == "DIV"){
      target = null;
    }
    
    if(!window.flagDragFromCraft && !target){return ;}
    this.copy_grid_item(dragSubject, target);
    window.dragSubject = null;
  }

  static copy_grid_item(source, dest){

    if(dest){
      $(dest).attr('name', $(source).attr('name'));
      dest.children[0].src = source.children[0].src;
      dest.children[1].innerHTML = source.children[1].innerHTML;
    }
    
    if(window.flagDragFromCraft && !window.keystate.Shift && !window.keystate.Control){
      $(source).attr('name', '');
      source.children[0].src = ''
      source.children[1].innerHTML = ''
    }
  }
}