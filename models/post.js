import Model from './model.js';

export default class Post extends Model {
    constructor() {
        super(true /* secured Id */);

        this.addField('Title', 'string');
        this.addField('Text', 'string');
        this.addField('Category', 'string');
        this.addField('Image', 'asset');
        this.addField('Date', 'integer');
        this.setKey("Title");
    }

    bindExtraData(instance){
        instance = super.bindExtraData(instance);
        this.addField('Likes', 'array');
        instance.Likes = [];
        return instance;
    }
    addLike(user){
        instance.Likes.push(user);
    }
}