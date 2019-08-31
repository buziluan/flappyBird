import Tween from "./Tween.js";
import Util from "./util.js";
import Bird from "./bird.js"
export default class Game {
	constructor(el) {
		//游戏框元素
		this.el = el;
		//地图动画元素
		this.mapElement = null;
		//地面移动定时器（动画帧）
		this.mapTimer = null;
		//地面元素
		this.ground = null;
		//准备状态背景图
		this.readyImage = null;
		//分数元素
		this.scoreElement = null;
		//分数
		this.score = 0;
		//鸟对象
		this.bird = null;
		//初始化
		this.init();
	}
	//初始化方法
	init() {
		this.score = 0
		this.mapRender();
		this.recordRender();
		this.createBird();

		document.addEventListener("keydown", (e) => {
			if (e.keyCode === 13) this.init()
			e.stopPropagation();
			// e.preventDefault();
		})
		document.addEventListener("click", (e) => {
			this.bird.move()
			Tween.MTween({
				el: this.readyImage,
				attr: {
					opacity: 0,
					top: this.readyImage.offsetTop + 200
				},
				duration: 300
			})
			this.test1()
			e.stopPropagation();
			e.preventDefault();
		})
		
	}
	//地图初始化
	mapRender() {
		this.el.innerHTML = ""
		//获取整体元素
		let gameElement = this.el;
		gameElement.classList.add("game")

		//创建游戏内容块
		let gameContent = document.createElement("div");
		gameContent.id = "game-content";
		this.mapElement = gameContent
		//创建地面元素（及运动块）
		let bottomContent = document.createElement("div");
		bottomContent.id = "bottom-content";
		this.ground = bottomContent
		let road = document.createElement("div");
		road.id = "road";
		bottomContent.appendChild(road)


		gameElement.appendChild(gameContent)
		gameElement.appendChild(bottomContent)
		//移动
		Util.roadMove(road, this)
	}

	//计分器，图标初始化
	recordRender() {
		let icon = document.createElement("div")
		icon.id = "initBgImg"
		this.readyImage = icon
		let score = document.createElement("div");
		this.scoreElement = score
		score.id = "score"
		score.innerText = this.score
		this.el.appendChild(icon)
		this.el.appendChild(score)
	}

	//创建鸟
	createBird() {
		this.bird = new Bird(this)
	}

	//结束方法(游戏结束，动画结束，显示分数)
	stop() {
		cancelAnimationFrame(this.mapTimer)
		this.mapTimer = null
		this.gameOver()
	}

	//游戏结束
	async gameOver() {
		//结束图片
		let gameover = document.createElement("div");
		gameover.id = "game-over";
		Tween.css(this.scoreElement, "opacity", 0);
		//分数版
		let scoreBox = document.createElement("div");
		scoreBox.id = "score-box";
		//奖牌
		let box_img = new Image();
		box_img.src = "./img/medal.png";
		scoreBox.appendChild(box_img);
		//本次分数
		let score = document.createElement("span");
		score.innerText = this.score;
		scoreBox.appendChild(score);
		//最高历史分数
		let historyScore = document.createElement("span");
		historyScore.innerText = 100;
		scoreBox.appendChild(historyScore);
		//重新开始
		let start = document.createElement("div");
		start.id = "start-btn"
		start.addEventListener("click", (e) => {
			this.init();
			e.stopPropagation()
		})
		this.el.appendChild(gameover);
		this.el.appendChild(scoreBox);
		this.el.appendChild(start);
		await Tween.MTween({
			el: gameover,
			attr: {
				opacity: 1,
				top: 100
			}
		});
		await Tween.MTween({
			el: scoreBox,
			attr: {
				opacity: 1,
				top: 200
			}
		});
		await Tween.MTween({
			el: start,
			attr: {
				opacity: 1
			},
			duration: 200
		});

	}

	//测试方法
	test1() {
		setInterval(() => {
			Util.counter(this)
		}, 1000)
	}
}
