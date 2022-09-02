import { v4 as uuidv4 } from 'uuid';

const Mutation = {
    createUser(_, args, { db }){
        const user = {
            id: uuidv4(),
            ...args.data
        }

        db.users.push(user)

        return user
    },
    updateUser(_, args, { db }){
        const user = db.users.find(user => user.id === args.id)

        user.email = args.data.email
        user.name = args.data.name
        user.age = args.data.age

        return user
    },
    deleteUser(_, args, { db }){
        const userIndex = db.users.find(user => user.id === args.id)

        const deletedUser = db.users.splice(userIndex, 1)

        db.posts = db.posts.filter(post => post.author === args.id)
        db.posts = db.comments.filter(comment => comment.author === args.id)

        return deletedUser
    },
    createPost(_, args, { db, pubsub }){
        const post = {
            id: uuidv4(),
            ...args.data
        }

        db.posts.push(post)

        if(args.data.published) {
            pubsub.publish('post', { 
                post: {
                    mutation: 'CREATED',
                    data: post
                }
             })
        }

        return post
    },
    updatePost(_, args, { db, pubsub }){
        const post = db.posts.find(post => post.id === args.id)
        const originalPost = { ...post }

        post.title = args.data.title
        post.body = args.data.body
        post.published = args.data.published

        if(originalPost.published && !post.published){
            pubsub.publish('post', { 
                post: {
                    mutation: 'DELETED',
                    data: originalPost
                }
             })
        } else if(!originalPost.published && post.published) {
            pubsub.publish('post', { 
                post: {
                    mutation: 'CREATED',
                    data: post
                }
             })
        } 

        pubsub.publish('post', { 
            post: {
                mutation: 'UPDATED',
                data: post
            }
         })


        return post
    },
    deletePost(_, args, { db }){
        const postIndex = db.posts.find(post => post.id === args.id)

        const [post] = db.posts.splice(postIndex, 1)

        db.comments = db.comments.filter(comment => comment.post !== args.id)
        if(post.published){
            pubsub.publish('post', { 
                post: {
                    mutation: 'DELETED',
                    data: post
                }
             })
        }

        return post
    },
    createComment(_, args, { db, pubsub }){
        const comment = {
            id: uuidv4(),
            ...args.data
        }

        db.comments.push(comment)
        pubsub.publish(`comment ${args.data.post}`, { 
            comment: {
                mutation: 'CREATED',
                data: comment
            }
         })

        return comment
    },
    updateComment(_, args, { db, pubsub }){
        const comment = db.comments.find(comment => comment.id === args.id)

        comment.text = args.text

        pubsub.publish(`comment ${comment.post}`, { 
            comment: {
                mutation: 'UPDATED',
                data: comment
            }
         })

        return comment
    },
    deleteComment(_, args, { db, pubsub }){
        const commentIndex = db.comments.findIndex(comment => comment.id === args.id)

        const [deletedComment] = db.comments.splice(commentIndex, 1)
        pubsub.publish(`comment ${deletedComment.post}`, { 
            comment: {
                mutation: 'DELETED',
                data: deletedComment
            }
         })

        return deletedComment
    },
  }

  export default Mutation