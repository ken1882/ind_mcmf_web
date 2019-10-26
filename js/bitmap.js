/**---------------------------------------------------------------------------
 * The basic object that represents an image.
 *
 * @class Bitmap
 * @constructor
 * @param {Number} x - The X point of the bitmap
 * @param {Number} y - The Y point of the bitmap
 * @param {Number} width - The width of the bitmap
 * @param {Number} height - The height of the bitmap
 */
class Bitmap{
  /**-------------------------------------------------------------------------
   * @constructor
   * @memberof Bitmap
   */
  constructor(){
    this.initialize.apply(this, arguments);
  }
  /**-------------------------------------------------------------------------
   * > Object initialization
   * @memberof Bitmap
   */
  initialize(x = 0, y = 0, w = 1, h = 1){
    this.createCanvas();
    this.setPOS(x, y);
    this.resize(w, h);
  }
  /*-------------------------------------------------------------------------*/
  createCanvas(){
    this._canvas  = document.createElement("canvas");
    this._context = this._canvas.getContext("2d");
  }
  /*-------------------------------------------------------------------------*/
  setX(x){
    this._x = x;
    this._canvas.style.left = this.realX + 'px'
  }
  /*-------------------------------------------------------------------------*/
  setY(y){
    this._y = y;
    this._canvas.style.top = this.realY + 'px'
  }
  /*-------------------------------------------------------------------------*/
  setPOS(x, y){
    this.setX(x);
    this.setY(y);
    return this;
  }
  /*-------------------------------------------------------------------------*/
  setZ(z){
    this._canvas.style.zIndex = z;
    return this;
  }
  /*-------------------------------------------------------------------------*/
  resize(w, h){
    if(w === null){w = this._width;}
    if(h === null){w = this._height;}
    this._width = w; this._height = h;
    this._canvas.width  = w;
    this._canvas.height = h;
    return this;
  }
  /*-------------------------------------------------------------------------*/
  hide(){
    this._canvas.style.display = "none";
    return this;
  }
  /*-------------------------------------------------------------------------*/
  show(){
    this._canvas.style.display = '';
    return this;
  }
  /*-------------------------------------------------------------------------*/
  blt(){
    this._context.drawImage.apply(this._context, arguments);
  }
  /**-------------------------------------------------------------------------
   * > Draw Icon in Iconset
   */
  drawIcon(icon_index, x, y){
    icon_index = parseInt(icon_index);
    let src_rect = clone(IconRect);
    src_rect.x = src_rect.padding + icon_index % 9 * src_rect.offset;
    src_rect.y = src_rect.padding + parseInt(icon_index / IconsetImage.RawCount) * src_rect.offset;
    let sx = src_rect.x, sy = src_rect.y, sw = src_rect.width, sh = src_rect.height;
    console.log(parseInt(icon_index / IconsetImage.RawCount), src_rect.height)
    console.log(sx, sy, sw, sh, x, y, sw, sh);
    this.blt(IconsetImage, sx, sy, sw, sh, x, y, sw, sh);
  }
  /*-------------------------------------------------------------------------*/
  setOpacity(opa){
    this._canvas.style.opacity = opa
  }
  /*-------------------------------------------------------------------------*/
  dispose(){
    this._canvas  = null;
    this._context = null;
    if(this.input){this.input.destroy();}
    this.input = null;
  }
  /*-------------------------------------------------------------------------*/
  isDisposed(){
    return this._canvas === null;
  }
  /*-------------------------------------------------------------------------*/
  render(){
    
  }
  /*-------------------------------------------------------------------------*/
  remove(){
    
  }
  /*-------------------------------------------------------------------------*/
  get canvas(){return this._canvas;}
  get context(){return this._context;}
  /*-------------------------------------------------------------------------*/
}