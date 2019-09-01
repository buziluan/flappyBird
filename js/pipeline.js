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
		this.el =
			`<ul class="pipeline-ul">
				<li>
					<ul>
						<li class="pipeline-li" style="margin-right:${Util.pipelineMarginRight(this.game)}px">
							<div class="li-up li" style="height:${Util.random()}%">
								<div class="li-up-pillar"></div>
								<div class="li-up-lid"></div>
							</div>
							<div class="li-down li">
								<div class="li-down-lid"></div>
								<div class="li-down-pillar"></div>
							</div>
						</li>
						<li class="pipeline-li" style="margin-right:${Util.pipelineMarginRight(this.game)}px">
							<div class="li-up li" style="height:${Util.random()}%">
								<div class="li-up-pillar"></div>
								<div class="li-up-lid"></div>
							</div>
							<div class="li-down li">
								<div class="li-down-lid"></div>
								<div class="li-down-pillar"></div>
							</div>
						</li>
						<li class="pipeline-li" style="margin-right:${Util.pipelineMarginRight(this.game)}px">
							<div class="li-up li" style="height:${Util.random()}%">
								<div class="li-up-pillar"></div>
								<div class="li-up-lid"></div>
							</div>
							<div class="li-down li">
								<div class="li-down-lid"></div>
								<div class="li-down-pillar"></div>
							</div>
						</li>
					</ul>
				</li>
				<li>
					<ul>
						<li class="pipeline-li" style="margin-right:${Util.pipelineMarginRight(this.game)}px">
							<div class="li-up li" style="height:${Util.random()}%">
								<div class="li-up-pillar"></div>
								<div class="li-up-lid"></div>
							</div>
							<div class="li-down li">
								<div class="li-down-lid"></div>
								<div class="li-down-pillar"></div>
							</div>
						</li>
						<li class="pipeline-li" style="margin-right:${Util.pipelineMarginRight(this.game)}px">
							<div class="li-up li" style="height:${Util.random()}%">
								<div class="li-up-pillar"></div>
								<div class="li-up-lid"></div>
							</div>
							<div class="li-down li">
								<div class="li-down-lid"></div>
								<div class="li-down-pillar"></div>
							</div>
						</li>
						<li class="pipeline-li" style="margin-right:${Util.pipelineMarginRight(this.game)}px">
							<div class="li-up li" style="height:${Util.random()}%">
								<div class="li-up-pillar"></div>
								<div class="li-up-lid"></div>
							</div>
							<div class="li-down li">
								<div class="li-down-lid"></div>
								<div class="li-down-pillar"></div>
							</div>
						</li>
					</ul>
				</li>
			</ul>`;
	}
	//移动
	pipelineMove() {

		let ul = document.querySelector(".pipeline-ul");
		let _this = this
		move()
		let scoreList = [...document.querySelectorAll(".pipeline-li")];

		function move() {

			let nextPipeline =
				`<li>
						<ul>
							<li class="pipeline-li" style="margin-right:${Util.pipelineMarginRight(_this.game)}px">
								<div class="li-up li" style="height:${Util.random()}%">
									<div class="li-up-pillar"></div>
									<div class="li-up-lid"></div>
								</div>
								<div class="li-down li">
									<div class="li-down-lid"></div>
									<div class="li-down-pillar"></div>
								</div>
							</li>
							<li class="pipeline-li" style="margin-right:${Util.pipelineMarginRight(_this.game)}px">
								<div class="li-up li" style="height:${Util.random()}%">
									<div class="li-up-pillar"></div>
									<div class="li-up-lid"></div>
								</div>
								<div class="li-down li">
									<div class="li-down-lid"></div>
									<div class="li-down-pillar"></div>
								</div>
							</li>
							<li class="pipeline-li" style="margin-right:${Util.pipelineMarginRight(_this.game)}px">
								<div class="li-up li" style="height:${Util.random()}%">
									<div class="li-up-pillar"></div>
									<div class="li-up-lid"></div>
								</div>
								<div class="li-down li">
									<div class="li-down-lid"></div>
									<div class="li-down-pillar"></div>
								</div>
							</li>
						</ul>
					</li>`;

			_this.timer = requestAnimationFrame(function() {
				Tween.css(ul, "left", Tween.css(ul, "left") - 2);
				let map = _this.game.mapElement.getBoundingClientRect();
				let child = ul.children[1].getBoundingClientRect();
				let nowLeft = map.left - child.left;
				if (child.left - map.left <= 0) {
					ul.removeChild(ul.children[0]);
					Tween.css(ul, "left", nowLeft - 2);
					ul.innerHTML += nextPipeline;
					let list = ul.children[1].querySelectorAll(".pipeline-li")
					for (let i = 0; i < list.length; i++) {
						scoreList.push(list[i])
					}
					console.dir(scoreList[0].getBoundingClientRect())
				}
				let lis = document.querySelectorAll(".li");
				if (Util.addScore(scoreList[0], _this.game.bird.el)) {
					scoreList.shift()
					Util.counter(_this.game)
				}

				for (let i = 0; i < lis.length; i++) {
					if (Util.crash(lis[i], _this.game.bird.el)) {
						_this.game.bird.die()
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
