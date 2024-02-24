import { useUserRedux } from "../../redux/index"
import { baseIMG, baseICON } from "../../utils/api_config"
import style from "../../style/profile.module.css"
import { createSignal } from "solid-js"
import Form_uploadsong from "../../components/upload_form"
import UpdateProfile from "../../components/updateProfile"

function profile() {
	const [user] = useUserRedux()
	const [popupuploadsong, setpopupuploadsong] = createSignal('off')
	const [popupupdateprofile, setpopupupdateprofile] = createSignal('off')
	function closepopupfileupload() {
		setpopupuploadsong("off")
	}
	function closepopupupdateprofile() {
		setpopupupdateprofile("off")
	}





	return (
		<>
			<div class={style['contentuser']}>
				<div class={style['wrapcontentuser']}>
					<div class={style['backgroundavatar']}>
						<img class="background_img" hidden={user.background_img ? false : true} src={`${baseIMG}img/background/${user.background_img}`} />
						<div class={style['wrapbtnfuntion']}>
							<div class={style['btnfuntion']}>
								<span>Tạo Mới Avatar</span>
							</div>
							<div class={style['btnfuntion']}>
								<span>Chỉnh Sửa Ảnh Bìa</span>
							</div>
						</div>
					</div>
					<div class={style['user']}>
						<div class={style['avatar']}>
							<img class={style['img']} src={`${baseIMG}img/avatar/${user.avartar}`} />
						</div>
						<div class={style['detail']}>
							<div class={style['username']}>
								{user.userName}
							</div>
							<div class={style['follow']}>
								<div class={style['followitem']}>
									0 Follower
								</div>
								<span />
								<div class={style['followitem']}>
									0 Đang Theo Dõi
								</div>
							</div>
						</div>
						<div class={style['functionofuser']}>
							<div class={style['wrapbtnfunction']}>
								<div class={style['updateinfor']} onclick={() => setpopupupdateprofile('on')}>
									<span>Chỉnh Sửa Trang Cá Nhân</span>
									<img class={style['icon']} src={`${baseICON}icon/pencil.svg`} />
								</div>
								<div class={style['addnew']} onclick={() => setpopupuploadsong('on')} >
									<span>Thêm Mới</span>
									<img src={`${baseICON}icon/plus.svg`} />
								</div>
							</div>
							<div class={style['btnsuggetfollew']}>
								<img src={`${baseICON}icon/down.svg`} />
							</div>
						</div>
					</div>
				</div>
				{
					popupuploadsong() === "off" ?
						<></> :
						<Form_uploadsong closepopup={closepopupfileupload} />
				}
			</div>
			<div class={style['profilecontent']}>
				<div class={style['wrapcontent']}>
					<div class={style['sidebarcontent']}>
						<div class={style['introduce']}>
							<label>Giới thiệu</label>
							<img src={`${baseICON}icon/id-card-h.svg`} />
						</div>
						<div class={style['music']}>
							<label>Nhạc</label>
							<img src={`${baseICON}icon/music-one.svg`} />
						</div>
						<div class={style['frend']}>
							<label>Bạn bè</label>
							<img src={`${baseICON}icon/peoples-two.svg`} />
						</div>
					</div>
				</div>
			</div>

			{
				popupupdateprofile() === "off" ?
					<></> :
					<UpdateProfile closepopup={closepopupupdateprofile} />
			}

		</>
	)
}



export default profile
