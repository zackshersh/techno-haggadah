
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
        this.contentID = "https://www.colorhexa.com/e6e6e6.png";
        this.visible = true;
        this.page = page;
    }
}