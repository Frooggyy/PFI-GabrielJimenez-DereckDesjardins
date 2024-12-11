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
        
        instance.Likes = [];
        return instance;
    }
    addLike(user){
        instance.Likes.push(user);
    }
}