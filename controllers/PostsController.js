import PostModel from '../models/post.js';
import Repository from '../models/repository.js';
import Controller from './Controller.js';

export default class PostModelsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext, new Repository(new PostModel()));
    }

    like(data){
        let user = data.user;
        let post = data.postId;

        let foundPost = null
        let repoList = this.repository.getAll();
        for(var repoPost of repoList){
            if(repoPost.Id == post)
                foundPost = repoPost;
        }
        if(foundPost !=null){
            let userFound = false;
            for(let i=0; i<foundPost.Likes.length;i++){
                if(foundPost.Likes[i].Email == user.Email){
                    userFound = true;
                }
            }
            if(userFound){
                foundPost.Likes.pop(user);
            }else{
                foundPost.Likes.push(user);
            }
            
            
            let imageFormat = foundPost.Image.split('/');
            foundPost.Image = imageFormat[imageFormat.length-1];
            this.repository.update(post, foundPost);

        }
    }
}