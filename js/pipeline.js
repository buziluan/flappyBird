/**
 * 管道类
 */

import Util from "./util.js";
import Tween from "./Tween.js"

export default class Pipeline {
	constructor(game) {
		this.game = game;
		this.el = null;
		this.Movertimer = null;
		this.timer = null;
		this.init();
	}

	//初始方法
	init() {
		this.render();
	}

	//创建管道方法
	render() {

		let ul = document.createElement("ul");
		ul.classList.add("pipeline-ul");
		for (let i = 0; i < 2; i++) {
			let child_Li_1 = document.createElement("li");
			let child_li_ul_1 = document.createElement("ul");
			for (let i = 0; i < 3; i++) {
				let li = document.createElement("li");
				li.classList.add("pipeline-li");
				li.style.marginRight = Util.pipelineMarginRight(this.game) + 'px';

				let div_up = document.createElement("div");
				div_up.className = "li-up li";
				div_up.style.height = Util.random() + "%";
				let div_up_pillar = document.createElement("div");
				div_up_pillar.classList.add("li-up-pillar");
				let div_up_lid = document.createElement("div");
				div_up_lid.classList.add("li-up-lid");
				div_up.appendChild(div_up_pillar);
				div_up.appendChild(div_up_lid);

				let div_down = document.createElement("div");
				div_down.className = "li-down li";
				let div_down_lid = document.createElement("div");
				div_down_lid.classList.add("li-down-lid");
				let div_down_pillar = document.createElement("div");
				div_down_pillar.classList.add("li-down-pillar");
				div_down.appendChild(div_down_lid);
				div_down.appendChild(div_down_pillar);
				li.appendChild(div_up);
				li.appendChild(div_down);
				child_li_ul_1.appendChild(li)
			}
			child_Li_1.appendChild(child_li_ul_1);
			ul.appendChild(child_Li_1)
		}
		this.game.mapElement.appendChild(ul);
		this.el = ul
	}
	//移动
	pipelineMove() {

		let ul = document.querySelector(".pipeline-ul");
		let _this = this
		move()
		let scoreList = [...document.querySelectorAll(".pipeline-li")];

		function move() {

		
			let nextPipeline = document.createElement("li");
			let child_li_ul_1 = document.createElement("ul");
			for (let i = 0; i < 3; i++) {
				let li = document.createElement("li");
				li.classList.add("pipeline-li");
				li.style.marginRight = Util.pipelineMarginRight(_this.game) + 'px';

				let div_up = document.createElement("div");
				div_up.className = "li-up li";
				div_up.style.height = Util.random() + "%";
				let div_up_pillar = document.createElement("div");
				div_up_pillar.classList.add("li-up-pillar");
				let div_up_lid = document.createElement("div");
				div_up_lid.classList.add("li-up-lid");
				div_up.appendChild(div_up_pillar);
				div_up.appendChild(div_up_lid);

				let div_down = document.createElement("div");
				div_down.className = "li-down li";
				let div_down_lid = document.createElement("div");
				div_down_lid.classList.add("li-down-lid");
				let div_down_pillar = document.createElement("div");
				div_down_pillar.classList.add("li-down-pillar");
				div_down.appendChild(div_down_lid);
				div_down.appendChild(div_down_pillar);
				li.appendChild(div_up);
				li.appendChild(div_down);
				child_li_ul_1.appendChild(li)
			}
			nextPipeline.appendChild(child_li_ul_1);


			_this.timer = requestAnimationFrame(function() {
				Tween.css(ul, "left", Tween.css(ul, "left") - 2.5);
				let map = _this.game.mapElement.getBoundingClientRect();
				let child = ul.children[1].getBoundingClientRect();
				let nowLeft = map.left - child.left;
				if (child.left - map.left <= 0) {
					ul.removeChild(ul.children[0]);
					Tween.css(ul, "left", nowLeft - 2.5);
					ul.appendChild(nextPipeline)
					for (let i = 0; i < ul.length; i++) {
						console.dir(ul[i])
					}
					let list = ul.children[ul.children.length-1].querySelectorAll(".pipeline-li")
					for (let i = 0; i < list.length; i++) {
						scoreList.push(list[i])
					}
				}
				let lis = document.querySelectorAll(".li");
				if (Util.addScore(scoreList[0], _this.game.bird.el)) {
					scoreList.shift();
					Util.counter(_this.game);
					_this.game.music.gold.play()
				}

				for (let i = 0; i < lis.length; i++) {
					if (Util.crash(lis[i], _this.game.bird.el)) {
						_this.game.bird.die();
					}
				}

				if (!_this.game.bird.isAlive) {
					_this.stop()
				} else {
					move()
				}
			})
		}
	}

	//停止
	stop() {
		cancelAnimationFrame(this.timer);
		this.timer = null;
	}
}
