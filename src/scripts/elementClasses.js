
export class TextElement{
    constructor(x,y,index,page){
        this.type = "text";
        this.x = x;
        this.y = y;
        this.w = 300;
        this.index = index;
        this.contentID = null;
        this.textStart = 0;
        this.textLength = 100;
        this.visible = true;
        this.page = page;
        this.fontSize = '12';
        this.font = 'Helvetica'
    }
}

export class ImageElement{
    constructor(x,y,index,page){
        this.type = "image";
        this.x = x;
        this.y = y;
        this.w = 300;
        this.index = index;
        this.contentID = "https://media0.giphy.com/media/1yiNv0xauBg8SHLAJT/giphy.gif?cid=ecf05e473ac3848b0868af7286451ff256255c291b5fc846&rid=giphy.gif&ct=g";
        this.visible = true;
        this.page = page;
    }
}