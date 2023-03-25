import {PostModel, PostDB} from "../types";

export class Post {
    constructor(
        private id: string,
        private content: string,
        private comments: number,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updatedAt: string,
        private creatorId: string,
        private creatorName: string
    ){}

    public toDBModel(): PostDB{
        return {
            id:this.id,
            creator_id: this.creatorId,
            comments: this.comments,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            updated_at: this.updatedAt,        
        }
    }

    public toBusinessModel():PostModel{
        return{
            id: this.id,
            content: this.content,
            comments: this.comments,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            creator: {
                id: this.creatorId,
                name: this.creatorName
            }
        }
    }

    public getId():string{
        return this.id
    }

    public setId(value:string){
        this.id = value
    }

    public getContent():string{
        return this.content
    }

    public setContent(value:string){
        this.content = value
    }

    public getComments():number{
        return this.comments
    }

    public setComments(value:number){
        this.comments = value
    }

    public addCommentsPosts() {
        this.comments +=1
    }

    public getLikes():number{
        return this.likes
    }

    public setLikes(value:number){
        this.likes = value
    }

    public addLike() {
        this.likes +=1
    }

    public removeLike() {
        this.likes -=1
    }

    public getDislikes():number{
        return this.dislikes
    }

    public setDislikes(value:number){
        this.dislikes = value
    }

    public addDislike() {
        this.dislikes +=1
    }

    public removeDislike() {
        this.dislikes -=1
    }

    public getCreatedAt():string{
        return this.createdAt
    }

    public setCreatedAt(value:string){
        this.createdAt = value
    }

    public getUpdatedAt():string{
        return this.updatedAt
    }

    public setUpdatedAt(value:string){
        this.updatedAt = value
    }

    public getCreatorId():string {
        return this.creatorId
    }
 
    public setCreatorId(value:string):void {
        this.creatorId = value
    }

    public getCreatorName():string{
        return this.creatorName
    }
 
    public setCreatorName(value:string):void{
        this.creatorName = value
    }

}