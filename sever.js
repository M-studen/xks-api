const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
//定义端口号
const port = 80;
async function getallarticle(){
    return prisma.article.findMany()
}
async function getnew(){
    return prisma.article.findFirst({orderBy:{id:"desc"}})
}
async function getbanner(){
    return prisma.banner.findFirst()
}
async function getfrindlinks(){
    return prisma.frienlink.findMany()
}
async function getallplans(){
    return prisma.plan.findMany()
}
async function getdidplans(){
    return prisma.plan.findMany({where:{status:0}})
}
async function getdoingplans(){
    return prisma.plan.findMany({where:{status:1}})
}
async function getwillplans(){
    return prisma.plan.findMany({where:{status:2}})
}
async function getprojects(){
    return prisma.projects.findMany()
}
//添加路由
app.get('/', (req, res) => res.send(app.routes));
// 绑定端口号
app.get('/article',async(req,res)=>{
    let data=await getallarticle()
    res.json(data)
})
app.get('/new',async(req,res)=>{
    let data=await getnew();
    res.json(data)
})
app.get('/banner',async(req,res)=>{
    res.json(await getbanner())
})
app.get('/friendlinks',async(req,res)=>{
    res.json(await getfrindlinks())
})
app.get('/plans',async(req,res)=>{
    let data;
    if(req.query.status){
        switch (req.query.status){
            case 'did':data=await getdidplans();break;
            case 'doing':data=await getdoingplans();break;
            case 'will':data=await getwillplans();break;

        }
    }
    else{
        data=await getallplans()
    }
    res.json(data)
})
app.get('/projects',async(req,res)=>{
    res.json(await getprojects())
})
app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`));

