import Tween from "./Tween.js";
import Util from "./util.js";

export default class Bird {

	constructor(game) {
		this.game = game
		this.el = null;
		this.Movertimer = null;
		this.readyTimer = null;
		this.isAlive = null;
		this.init();
	}
	//初始化
	init() {
		this.isAlive = true
		this.birdRender()

	}

	//画出鸟
	birdRender() {
		let bird = document.createElement("div");
		this.el = bird;
		bird.id = "brid";
		this.game.el.appendChild(bird)
		this.readyMove()
	}

	//鸟上下移动
	readyMove() {
		var iSpeed = 0;
		this.readyTimer = setInterval(
			() => {
				if (this.el.offsetTop < 233) {
					iSpeed += (233 - this.el.offsetTop) / 18;
				} else {
					iSpeed -= (this.el.offsetTop - 233) / 18;
				}
				Tween.css(this.el, "top", this.el.offsetTop + iSpeed)
			}, 30);
	}

	move() {
		var iSpeed = -15;
		let x = 1.8
		if (this.readyTimer) {
			clearInterval(this.readyTimer);
			this.readyTimer = null
		}
		clearInterval(this.Movertimer);
		if (this.isAlive) {
			this.Movertimer = setInterval(() => {
				iSpeed += x;
				x *= 1.03;
				let T = this.el.offsetTop + iSpeed;
				if (T < 20 + 4) {
					iSpeed *= 0.85;
				}
				Tween.css(this.el, "top", T)
				this.game.music.fly.play()
				if (Util.crash(this.el, this.game.ground)) {
					this.die()
					this.game.music.crash.play()
					let bgHeight = Tween.css(this.game.mapElement, "height");
					let elHeight = Tween.css(this.el, "height")
					Tween.css(this.el, "top", bgHeight - elHeight)
				}
			}, 45);
		}
	}

	//死亡方法
	die() {
		clearInterval(this.Movertimer);
		this.isAlive = false;
		this.el.style.background = "url(img/bird.png)"
		this.game.stop()
	}

}
