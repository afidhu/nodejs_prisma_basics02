const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

exports.getUsers = async (req, resp) => {
    try {
    const results = await prisma.user.findMany({
        // include:{ post:true}
        select:{
            username:true,
            post:true,
        },
         orderBy:{
            id:'desc'
         }
    })
        return resp.status(200).json(results)

    } catch (error) {

    }

}

/////////Get user by id ////////////
exports.getUserById = async (req, resp) => {
   try {
    const{id}= req.params;
    const userData =await prisma.user.findUnique({
        where:{
            id:parseInt(id)
        },
        select:{
            id:true,
            username:true,
            post:true
        }
    })
 if(userData){
    return resp.status(200).json(userData)
 }else{
    return resp.status(404).json({msg:'User not found'})
 }
    
   } catch (error) {
    return resp.status(500).json({msg:'Internal server error',error:error.message})
   }

}
///////////Create User ////////////

exports.createUser =async(req, resp)=>{
    try {
        const{username} = req.body;
        const checkuserExist  = await prisma.user.findUnique({
            where:{
                username:username
            },
            select:{
                username:true
            }
         
        })

        if(checkuserExist){
            return resp.status(400).json({msg:'User already exist'})
        }else{
            const createResults = await prisma.user.create({
                data:{
                    username:username,
                
                }
            })

            if(createResults){
                return resp.status(201).json({msg:'User created successfully',user:createResults})
            }else{
                return resp.status(400).json({msg:'Something went wrong'})
            }
        }
    
        
    } catch (error) {
        return resp.status(500).json({msg:'Internal server error',error:error.message   })
        
    }
}