import express from 'express'
import Comment from '../models/comment.js'
import Post from '../models/post.js'

const router = express.Router()

router.put('/:commentId', (req, res) => {
	const { commendId } = req.params
	const { text } = req.body
	Comment.findByIdAndUpdate(commendId, text).exec().then(() => {
		res.sendStatus(200)
	}).catch(err => {
		console.error(err)
		res.status(400).json({
			errorMessage: '댓글 수정을 실패했습니다.'
		})
	})
})
router.delete('/:commentId', (req, res) => {
	// dont' actually delete the comment from db but set isDelete true
	// By deleting the comment, it may cause descendant comments to be orphans
	// Only implement above if 대댓글 is allowed
	const { commentId } = req.params
	Comment.findByIdAndDelete(commentId).exec().then(() => {
		res.sendStatus(200)
	}).catch(err => {
		console.error(err)
		res.status(400).json({
			errorMessage: '댓글 삭제를 실패했습니다.'
		})
	})
})
router.get('/', (req, res) => {
	res.status(403).json({
		errorMessage: '댓글 API 에 직접 접근할 수 없습니다. 게시물을 통해 접근해주세요.'
	})
})
router.post('/', (req, res) => {
	const { postId, text } = req.body
	const { userId } = res.locals
	Comment.create({ postId, text, userId }).then(comment => {
		Post.findById(postId).exec().then(post => {
			post.comments.push(comment)
			return post.save()
		})
		res.sendStatus(201)
	}).catch(err => {
		console.error(err)
		res.status(400).json({
			errorMessage: '댓글 작성을 실패했습니다.'
		})
	})
})
export default router