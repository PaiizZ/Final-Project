import { StyleSheet, Image, Platform, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

import { colors } from 'src/constants/mixins'
import { PICTURE_GRID_SIZE } from 'src/constants'
import ReviewActions from 'src/redux/actions/review'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import ImageActions from 'src/redux/actions/image'

export class ReviewPhoto extends Component {
	constructor(props) {
		super(props)
	}

	styleImageGrid(page) {
		if (Platform.OS === 'ios') {
			if (page === 'GlobalPage') {
				return styles.review_image_grid
			} else {
				return styles.review_image_grid_user
			}
		} else {
			return styles.review_image
		}
	}

	render() {
		return (
			<View style={styles.container}>
				{this.props.review.picture_thumbnail_url ? (
					<TouchableOpacity
						onPress={() => {
							Actions.viewReviewPage({ review_id: this.props.review._id })
						}}
						delayLongPress={500} 
						onLongPress={() => this.props.showPreviewReview(this.props.review)}
						onPressOut={() => this.props.hidePreviewReview()}
					>
						<Image
							source={{ uri: this.props.review.picture_thumbnail_url }}
							style={this.styleImageGrid(this.props.page)}
							resizeMode="contain"
						/>
					</TouchableOpacity>
				) : (
					<View />
				)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.white
	},
	review_image: {
		width: PICTURE_GRID_SIZE,
		height: PICTURE_GRID_SIZE
	},
	review_image_grid: {
		width: PICTURE_GRID_SIZE - 2,
		height: PICTURE_GRID_SIZE - 2
	},
	review_image_grid_user: {
		width: PICTURE_GRID_SIZE - 10,
		height: PICTURE_GRID_SIZE - 10
	}
})

const mapDispatchToProps = dispatch => ({
	
	showPreviewReview: review => {
		dispatch(ImageActions.showPreviewReviewModal(review))
	},
	hidePreviewReview: () => {
		dispatch(ImageActions.hidePreviewReviewModal())
	}
})

export default connect(null, mapDispatchToProps)(ReviewPhoto)
