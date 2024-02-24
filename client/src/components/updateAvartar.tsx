import style from "../style/updateProdile.module.css";
import style1 from '../style/editavatar.module.css';
import { baseICON, baseIMG } from "../utils/api_config";
import { useUserRedux } from "../redux/index"
import { uploadAvartar } from "../utils/user";

export default function UpdateAvartar({ closepopup }: any) {
	const [user] = useUserRedux()
	function closepopupupdateprofile(e: MouseEvent) {
		const element = (e.target as HTMLElement)
		if (element.className === style["update_avatar"] || element.className === style['cancel_popup_avatar']) {
			closepopup()
		}
	}

	let setste = false
	let isDragging = false;
	let countx = 0;
	let county = 0;
	let i = 0
	let j = 0
	let maxX = 0
	let maxY = 0

	function scaleImage() {
		const container = document.getElementById(`${style1["container"]}`) as any;
		const draggable = document.getElementById(`${style1["draggable"]}`) as any;
		const img = document.querySelector(`.${style1["imgselect"]}`) as any;

		const containerRect = container.getBoundingClientRect();
		i = containerRect.left;
		j = containerRect.top;
		const test = draggable.getBoundingClientRect();
		if (setste) {
			if (test.left <= containerRect.left) {
				if (test.top <= containerRect.top) {
					container.style.transformOrigin = "left top"
					img.style.transformOrigin = "left top"
				} else if (test.bottom >= containerRect.bottom) {
					container.style.transformOrigin = "left bottom"
					img.style.transformOrigin = "left bottom"
				} else {
					container.style.transformOrigin = "left"
					img.style.transformOrigin = "left"
				}
			} else if (test.right >= containerRect.right) {
				if (test.top <= containerRect.top) {
					container.style.transformOrigin = "right top"
					img.style.transformOrigin = "right top"
				} else if (test.bottom >= containerRect.bottom) {
					container.style.transformOrigin = "right bottom"
					img.style.transformOrigin = "right bottom"
				} else {
					container.style.transformOrigin = "right"
					img.style.transformOrigin = "right"
				}
			} else if (test.top <= containerRect.top) {
				container.style.transformOrigin = "top"
				img.style.transformOrigin = "top"
			} else if (test.bottom >= containerRect.bottom) {
				container.style.transformOrigin = "bottom"
				img.style.transformOrigin = "bottom"
			}
			container.style.left = '0px'
			container.style.top = '0px'
			img.style.left = '0px'
			img.style.top = '0px'
		}
		var scaleValue = document.getElementById(`scaleControl`) as any;
		container.style.transform = 'scale(' + scaleValue.value + ')';
		img.style.transform = 'scale(' + scaleValue.value + ')';
	}

	function seteventmousedown(e: any) {
		isDragging = true;

		const container = document.getElementById(`${style1["container"]}`) as any;
		const draggable = document.getElementById(`${style1["draggable"]}`) as any;
		const img = document.querySelector(`.${style1["imgselect"]}`) as any;

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', () => {
			isDragging = false;
			document.removeEventListener('mousemove', handleMouseMove);
			container.style.transformOrigin = 'center'
			img.style.transformOrigin = 'center'
		});
		const containerRect = container.getBoundingClientRect();
		countx = e.clientX - containerRect.left;
		county = e.clientY - containerRect.top;

		if (maxX == 0 && maxY == 0) {
			i = containerRect.left;
			j = containerRect.top;
		}

		maxX = (containerRect.width / 2) - (draggable.clientWidth / 2);
		maxY = (containerRect.height / 2) - (draggable.clientHeight / 2);
	};

	function handleMouseMove(e: any) {
		if (isDragging) {
			setste = true
			const container = document.getElementById(`${style1["container"]}`) as any;
			const draggable = document.getElementById(`${style1["draggable"]}`) as any;
			const img = document.querySelector(`.${style1["imgselect"]}`) as any;
			const containerRect = container.getBoundingClientRect();
			const x = e.clientX - countx - i;
			const y = e.clientY - county - j;
			const u = Math.max(x, - containerRect.width / 2 + draggable.clientWidth / 2);
			const o = Math.max(y, - containerRect.width / 2 + draggable.clientHeight / 2)

			container.style.left = `${Math.min(u, maxX)}px`;
			container.style.top = `${Math.min(o, maxY)}px`;
			img.style.left = `${Math.min(Math.max(x, - containerRect.width / 2 + draggable.clientWidth / 2), maxX)}px`;
			img.style.top = `${Math.min(Math.max(y, - containerRect.width / 2 + draggable.clientHeight / 2), maxY)}px`;

		}
	}

	function readURL(input: any) {
		const imgbackground = document.querySelector('.imgbackgound') as any;
		const imgselect = document.querySelector(`.${style1['imgselect']}`) as any;
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function (e: any) {
				imgbackground.setAttribute('src', e.target.result);
				imgselect.setAttribute('src', e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
		}
	}

	function handleinputfile(e: any) {
		readURL(e.target);
	}

	function upload() {
		const container = document.getElementById(`${style1["container"]}`) as any;
		const draggable = document.getElementById(`${style1["draggable"]}`) as any;
		const fileinput = document.querySelector(`#inputfile`) as any;
		const containerRect = container.getBoundingClientRect();
		const test = draggable.getBoundingClientRect();
		const x = test.left - containerRect.left
		const y = test.top - containerRect.top
		uploadAvartar(x.toString(), y.toString(), fileinput.files[0]);
	}

	return (
		<>
			<div class={style['update_avatar']} onclick={closepopupupdateprofile} >
				<div class={style['form_update']}>
					<div class={style["update_detail"]}>
						<div>Chon anh dai dien</div>
						<div class={style["cancel_popup_avatar"]}>
							<img src={`${baseICON}icon/close.svg`} />
						</div>
					</div>
					<div class={style["update_detail"]}>
						<div class={style['title_item_update_detail']}>
							<div>Anh dai dien</div>
							<div>Them khung</div>
						</div>
					</div>
					<div class={style["update_detail"]} style={'display: flex; justify-content: center'}>
						<div class={style1["main"]} onmousedown={seteventmousedown}>
							<div class={style1["large-square"]} id={style1["container"]}>
								<img class="imgbackgound"
									src={`${baseIMG}img/avatar_original/${user.avatar_original}`} />
							</div>
							<div class={style1["large-square"]} id={style1["container"]}>
								<img class="imgbackgound"
									src={`${baseIMG}img/avatar_original/${user.avatar_original}`} />
							</div>
							{/* <div class={style1["small-square"]} id={style1["draggable"]}>
								<div class={style1["test"]}>
									<img class={style1["imgselect"]}
										src={`${baseIMG}img/avatar_original/${user.avatar_original}`} />
								</div>
							</div> */}
						</div>
					</div>
					<div class={style["update_detail"]}>
						<input id="inputfile" type="file" oninput={handleinputfile} />
						<input oninput={scaleImage} type="range" id="scaleControl" min="1" max="2" step="0.03" value="1" />
					</div>


					<div class={style["btn"]} >
						<div class={style["inner"]} ></div >
						<button onclick={upload} class={style['btn_update']}>Luu</button>
					</div >
				</div>


			</div>
		</>
	)
}
