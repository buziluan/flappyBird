/**
 * 工具类
 */
import Tween from "./Tween.js";


/**
 * 底部道路移动
 */
const roadMove = (el, game) => {
	let elWidht = Tween.css(el, "width")
	let speed = elWidht / (3 * 60 * 2);

	function move() {
		game.mapTimer = requestAnimationFrame(function() {
			let left = Tween.css(el, "left")
			if (left <= -(elWidht / 2) + 0.05 || left <= -(elWidht / 2) - 0.05) {
				Tween.css(el, "left", 0)
				move()
			} else {
				Tween.css(el, "left", Tween.css(el, "left") - speed)
				move()
			}
		})
	}
	move()
}

/**
 * * 计数器
 */

const counter = (instance) => {
	instance.score++
	instance.scoreElement.innerText = instance.score
}

/**
 * 碰撞检测
 */
const crash = (el1, el2) => {
	// 获取俩个元素的四条边位置
	let el1Pos = el1.getBoundingClientRect();
	let el2Pos = el2.getBoundingClientRect();
	if (
		el1Pos.right > el2Pos.left &&
		el1Pos.left < el2Pos.right &&
		el1Pos.bottom > el2Pos.top &&
		el1Pos.top < el2Pos.bottom
	) {
		return true;
	} else {
		return false;
	}
}
export default {
	roadMove,
	counter,
	crash
}
