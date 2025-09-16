const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

exports.getUsers = async (req, resp) => {
    try {
    const results = await prisma.user.findMany({
        // include:{ post:true}
        select:{
            username:true,
            post:true
        },
         orderBy:{
            id:'desc'
         }
    })
        return resp.status(200).json(results)

    } catch (error) {

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
                    username:username
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