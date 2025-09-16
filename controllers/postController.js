
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//Get all posts

exports.getPosts = async (req, resp) => {
    try {
        const results = await prisma.posts.findMany()
        return resp.status(200).json(results)
        
    } catch (error) {
        
    }
}


/////Create Post ////////////
exports.createPosts =async(req, resp)=>{
    try {
        const{title, content, userId} = req.body;
        const checkuserExist  = await prisma.user.findUnique({
            where:{
                id:userId
            }
        })
        if(!checkuserExist){
            return resp.status(400).json({msg:'User not found'})
        }else{
            const createResults =await prisma.posts.create({
                data:{
                    title:title,
                    content:content,
                    userId:userId
                }
            })

            if(createResults){
                return resp.status(201).json({msg:'Post created successfully',post:createResults})
            }else{
                return resp.status(400).json({msg:'Something went wrong'})
            }
        }
    } catch (error) {
        return resp.status(500).json({smg:'Internal server error',error:error.message})
    }
}