import Tween from "./Tween.js";
import Util from "./util.js";
import Bird from "./bird.js"
import Pipeline from "./pipeline.js"
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
		//管道对象（）
		this.pipeline = null;
		//游戏是否开始
		this.isStart = false;
		//声音
		this.music = null;
		//初始化
		this.init();
	}
	//初始化方法
	init() {
		this.el.innerHTML = ""
		this.score = 0
		this.mapRender();
		this.recordRender();
		this.createBird();
		this.createPipeline();
		this.gameMusic()
		document.ontouchstart = (e) => {
			this.start()
		}
	}
	//地图初始化
	mapRender() {
		//获取整体元素
		let gameElement = this.el;
		gameElement.classList.add("game")

		//创建上部地图内容块
		let mapElement = document.createElement("div");
		mapElement.id = "game-content";
		this.mapElement = mapElement
		//创建地面元素（及运动块）
		let bottomContent = document.createElement("div");
		bottomContent.id = "bottom-content";
		this.ground = bottomContent
		let road = document.createElement("div");
		road.id = "road";
		bottomContent.appendChild(road)
		gameElement.appendChild(mapElement)
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
		this.bird = new Bird(this);
	}

	//创建管道
	createPipeline() {
		this.pipeline = new Pipeline(this);
	}

	//开始游戏方法
	async start() {
		if (!this.isStart) {
			this.isStart = true
			this.bird.move()
			Tween.MTween({
				el: this.readyImage,
				attr: {
					opacity: 0,
					top: this.readyImage.offsetTop + 200
				},
				duration: 300
			})
			this.readyImage.style.display = "none"
			setTimeout(() => {
				this.pipeline.pipelineMove()
			}, 1700)
		} else {
			this.bird.move()
		}

	}

	//结束方法(游戏结束，动画结束，显示分数)
	stop() {
		this.gameOver()
	}

	//游戏结束
	async gameOver() {
		this.music.crash.play();
		this.isStart = false;
		document.ontouchstart = null;
		cancelAnimationFrame(this.mapTimer)
		this.mapTimer = null
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
		localStorage.setItem("score", localStorage.getItem("score") == null ? this.score : Math.max(this.score, localStorage
			.getItem("score")))
		scoreBox.appendChild(score);
		//最高历史分数
		let historyScore = document.createElement("span");
		historyScore.innerText = Math.max(this.score, (window.localStorage.getItem("score") || 0));
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

	//游戏声音
	gameMusic() {
		// let fly = document.createElement("audio");
		// fly.id = "paly";
		// fly.src = "./audio/fly.ogg";

		let crash = document.createElement("audio");
		crash.id = "paly";
		crash.src = "./audio/crash.ogg";

		// this.el.appendChild(fly);
		// this.el.appendChild(crash);

		this.music = {
			fly: document.querySelector("#paly"),
			crash: document.querySelector("#crash"),
			gold: document.querySelector("#gold")
		};
	}

	//测试方法
	test1() {

	}
}
