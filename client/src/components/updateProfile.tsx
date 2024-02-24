import style from "../style/updateProdile.module.css"
import { useUserRedux } from "../redux/index"
import { baseIMG, baseICON } from "../utils/api_config"
import { createSignal } from "solid-js"
import UpdateAvartar from "./updateAvartar"
import { uploadBackgroundImg } from "../utils/user";

export default function UpdateProfile({ closepopup }: any) {
	const [popupeditavatar, setpopupeditavatar] = createSignal('off')
	const [popupUploadBackgroundImg, setpopupUploadBackgroundImg] = createSignal('off')

	const [user] = useUserRedux()
	function closepopupupdateprofile(e: MouseEvent) {
		const element = (e.target as HTMLElement)
		if (element.className === style["update_profile"] || element.className === style['cancel']) {
			closepopup()
		}
	}
	function closepopupeditavatar() {
		setpopupeditavatar("off")
	}

	function handleInputBackgroundImg() {
		const input = document.querySelector('#input_background_img') as any
		input.click();
	}
	function handleDisplayBackgroundImg() {
		const input = document.querySelector('#input_background_img') as any
		const imgbackground = document.querySelector('.background_img') as any;
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function (e: any) {
				console.log(imgbackground)
				imgbackground.setAttribute('src', e.target.result);
				imgbackground.removeAttribute('hidden');
			}
			reader.readAsDataURL(input.files[0]);
		}
	}

	function closeUploadBackgroundImg(e: any) {
		if ([style['upload_background_img'], style['close_popup_editbackground']].includes(e.target.className)) {
			setpopupUploadBackgroundImg('off')
		}
	}

	function BackgroundImgSupmit() {
		// const container = document.getElementById(`${style1["container"]}`) as any;
		// const draggable = document.getElementById(`${style1["draggable"]}`) as any;
		const fileinput = document.querySelector(`#input_background_img`) as any;
		// const containerRect = container.getBoundingClientRect();
		// const test = draggable.getBoundingClientRect();
		// const x = test.left - containerRect.left
		// const y = test.top - containerRect.top
		uploadBackgroundImg('0', '0', fileinput.files[0]);
	}

	return (
		<div class={style['update_profile']} onclick={closepopupupdateprofile} >
			<div class={style['form_update']}>
				<div class={style["update_detail"]}>
					<div>Chinh sua trang ca nhan</div>
					<div class={style["cancel"]}>
						<img src={`${baseICON}icon/close.svg`} />
					</div>
				</div>
				<div class={style["update_detail"]}>
					<div class={style['title_item_update_detail']}>
						<title>Anh dai dien</title>
						<span style={'cursor: pointer'} onclick={() => setpopupeditavatar('on')}>Chinh sua</span>
					</div>
					<div class={style['avata_item_update_detail']}>
						<div class={style["wrap_avata_item"]}>
							<img src={`${baseIMG}img/avatar/${user.avartar}`} />
						</div>
					</div>
				</div>
				<div class={style["update_detail"]}>
					<div class={style['title_item_update_detail']}>
						<title>Anh bia</title>
						<span style={'cursor: pointer'} onclick={() => setpopupUploadBackgroundImg('on')}>Chinh sua</span>
					</div>
					<div class={style['avata_item_update_detail']}>
						<div class={style["wrap_background_item"]} >
							<img hidden={user.background_img ? false : true} src={`${baseIMG}img/background/${user.background_img}`} />
						</div>
					</div>
					{
						popupUploadBackgroundImg() == 'on' ?
							<div class={style['upload_background_img']} onclick={closeUploadBackgroundImg}>
								<div class={style['form_upload']}>
									<div class={[style['form_item'], style['title']].join(' ')}>
										<div>Cap nhat anh bia</div>
										<div class={style["close_popup_editbackground"]}>
											<img src={`${baseICON}icon/close.svg`} />
										</div>
									</div>
									<div class={style['form_item']}>
										<div class={style["wrap_img"]} onclick={handleInputBackgroundImg}>
											<img class="background_img" hidden={user.background_img ? false : true} src={`${baseIMG}img/background/${user.background_img}`} />
											<input hidden type="file" id="input_background_img" oninput={handleDisplayBackgroundImg} />
										</div>
									</div>
									<div class={style["btn"]} >
										<div class={style["inner"]} ></div >
										<button onclick={BackgroundImgSupmit} class={style['btn_update']}>Luu</button>
									</div >
								</div>
							</div>

							:
							<></>
					}

				</div>
				<div class={style["update_detail"]} style={'margin-top: 75px'}>
					<div class={style['title_item_update_detail']}>
						<title>Chinh sua phan gioi thieu</title>
						<span style={'cursor: pointer'}>Them</span>
					</div>
					<div class={style['item_introduce']}>
						<img src={`${baseICON}icon/home.svg`} />
						<div>tinh thanh pho hien tai</div>
					</div>
					<div class={style['item_introduce']}>
						<img src={`${baseICON}icon/home.svg`} />
						<div>Noi lam viec</div>
					</div><div class={style['item_introduce']}>
						<img src={`${baseICON}icon/home.svg`} />
						<div>Truong hoc</div>
					</div><div class={style['item_introduce']}>
						<img src={`${baseICON}icon/home.svg`} />
						<div>Que quan</div>
					</div><div class={style['item_introduce']}>
						<img src={`${baseICON}icon/home.svg`} />
						<div>Tinh trang moi quan he</div>
					</div>
				</div>

				<div class={style["btn"]} >
					<div class={style["inner"]} ></div >
					<button class={style['btn_update']}>Chinh sua thong tin gioi thieu</button>
				</div >
			</div>

			{
				popupeditavatar() === "off" ?
					<></> :
					<UpdateAvartar closepopup={closepopupeditavatar} />
			}
		</div>
	)
}
