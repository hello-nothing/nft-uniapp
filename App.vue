<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import '@/uni_modules/uview-ui/index.scss';
  //
	///*每个页面公共css */
  ///* #ifdef APP-PLUS */
	// @font-face {
	// 	font-family: my-font;
	// 	src: url('~@/static/font/my-font.ttf');
	// }
  ///* #endif */
  ///* #ifdef H5 */
  //@import '~@/static/font/font.css';
  ///* #endif */

	view,text,div {
		font-family: my-font !important;
	}
	.u-icon__icon{
		font-family: uicon-iconfont !important;
	}
	body{
		background-color: #151515;
	}
</style>
