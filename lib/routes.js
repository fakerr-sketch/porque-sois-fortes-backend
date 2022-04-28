const express = require('express')
const route = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

route.get('/last-posts', async function(req, res){
    const posts = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            created_at: true,
            user: {
                select: {
                    name: true,
                    image: true
                }
            }
        },
        orderBy: {
            id: 'desc'
        }
    });
    return res.json(posts)
})

route.get('/posts', async function(req, res) {
    const allPosts = await prisma.post.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    image: true
                }
            }
        }
    });
    return res.json(allPosts)
})

route.post('/new-post', async function(req, res){
    await prisma.post.create({
        data: req.body
    })
    return res.status(200)
})

route.get('/authors', async function(req, res){
    const authors = await prisma.user.findMany({
        include: {
            posts: {
                select: {
                    id: true,
                    title: true,
                    created_at: true,
                    description: true
                }
            }
        }
    })
    return res.status(200).json(authors)
});

route.delete('/post/:post_id', async function(req, res) {
    const { post_id } = req.params
    const postDeleted = await prisma.post.delete({
        where: {
            id: post_id
        }
    })

    return res.status(200).json(postDeleted)
})

module.exports = route
