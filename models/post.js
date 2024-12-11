import Model from './model.js';

export default class Post extends Model {
    constructor() {
        super(true /* secured Id */);

        this.addField('Title', 'string');
        this.addField('Text', 'string');
        this.addField('Category', 'string');
        this.addField('Image', 'asset');
        this.addField('Date', 'integer');
        this.addField('UserId', 'string');
        this.addField('Likes', 'array');
        this.setKey("Title");
    }

    bindExtraData(instance){
        instance = super.bindExtraData(instance);
        
        return instance;
    }
    addLike(user){
        console.log(instance.Likes);
        if(instance.Likes == undefined){
            this.addField('Likes', 'array');
        }
        instance.Likes.push(user);
    }
}