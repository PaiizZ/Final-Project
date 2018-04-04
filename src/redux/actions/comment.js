import constants from 'src/redux/constants'
import axios from 'react-native-axios'
import to from 'await-to-js'

const AppURL = constants.AppURL
const TestURL = constants.TestURL

const ReviewActions = {
	addComment: (comment, review_id) => async dispatch => {
		dispatch(actions.addCommentRequest())
		const [ err, response ] = await to(axios.post(`${TestURL}/reviews/${review_id}`), comment)
		if (err) dispatch(actions.addCommentError(err))
		else dispatch(actions.addCommentSuccess(response))
	},
	getComments: (review_id) => async dispatch => {
		dispatch(actions.getCommentRequest())
		const [err, response ] = await to(axios.get(`${TestURL}/reviews/${review_id}`))
		if (err) dispatch(actions.getCommentError(err))
		else dispatch(actions.getCommentSuccess(response))
	},
	editComment: (comment, review_id, comment_id) => async dispatch => {
		dispatch(actions.editCommentRequest())
		const [err, response ] = await to(axios.put(`${TestURL}/reviews/${review_id}/comments/${comment_id}`), comment)
		if (err) dispatch(actions.editCommentError(err))
		else dispatch(actions.editCommentSuccess(response))
	},
	deleteComment: (comment, review_id, comment_id) => async dispatch => {
		dispatch(actions.deleteCommentRequest())
		const [err, response ] = await to(axios.delete(`${TestURL}/reviews/${review_id}/comments/${comment_id}`), comment)
		if (err) dispatch(actions.deleteCommentError(err))
		else dispatch(actions.deleteCommentSuccess(response))
	}
}

const actions = {
	addCommentRequest: () => ({
		type: constants.ADD_COMMENT_REQUEST
	}),
	addCommentSuccess: comment => ({
		type: constants.ADD_COMMENT_SUCCESS,
		payload: { comment }
	}),
	addCommentError: error => ({
		type: constants.ADD_COMMENT_FAILURE,
		payload: { error }
	}),
	getCommentRequest: () => ({
		type: constants.GET_COMMENT_REQUEST
	}),
	getCommentSuccess: comments => ({
		type: constants.GET_COMMENT_SUCCESS,
		payload: { comments }
	}),
	getCommentError: error => ({
		type: constants.GET_COMMENT_FAILURE,
		payload: { error }
	}),
	editCommentRequest: () => ({
		type: constants.EDIT_COMMENT_REQUEST
	}),
	editCommentSuccess: comments => ({
		type: constants.EDIT_COMMENT_SUCCESS,
		payload: { comments }
	}),
	editCommentError: error => ({
		type: constants.EDIT_COMMENT_FAILURE,
		payload: { error }
	}),
	deleteCommentRequest: () => ({
		type: constants.DELETE_COMMENT_REQUEST
	}),
	deleteCommentSuccess: comments => ({
		type: constants.DELETE_COMMENT_SUCCESS,
		payload: { comments }
	}),
	deleteCommentError: error => ({
		type: constants.DELETE_COMMENT_FAILURE,
		payload: { error }
	})
}

export default ReviewActions