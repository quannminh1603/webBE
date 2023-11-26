const express = require('express');
const router = express.Router()
const CommentController = require('../controllers/CommentController')

router.post('/create', CommentController.createComment)
router.put('/update/:id', CommentController.updateComment)
router.delete('/delete/:id', CommentController.deleteComment)
router.get('/getByProductId/:id', CommentController.getCommentByProductId)

module.exports = router