import React from "react"
import "./My.css"
import {Button,Grid,Icon,Modal} from "semantic-ui-react"
import AvatarEditor from 'react-avatar-editor'
class My extends React.Component {
    constructor(props){
        super(props)
        this.state={
            avatar:"",
            username:"",
            isShow:false,
            isCrop:false,
            avatarCrop:""
        }
    }
    // 接受file文件路径
    acceptFile=(file)=>{
        this.setState({
            isShow:false,
            isCrop:true,
            avatarCrop:file
        })
    }

    // 显示imagemodeal
    showImage = ()=>{
        this.setState({
            isShow:true
        })
    }

    // 关闭裁切擦UN阿港口
    closeCrop=(img)=>{
        this.setState({
            isCrop:false,
            avatar:img
        })
    }
    // 页面挂在
    async componentDidMount(){
        let res = await this.axios.post("my/info",{
            user_id:localStorage.getItem("uid")
        })
        console.log(res)
        let {meta,data} = res
        if(meta.status === 200){
            localStorage.setItem("user_avatar",data.avatar)
            this.setState({
                avatar:data.avatar,
                username:data.username
            })
        }
    }
    render(){
        return (
            <div className='my-container'>
                {/* 模态框 */}
                <ImageModal open={this.state.isShow} acceptFile={this.acceptFile}></ImageModal>
                {/* 裁切图片模态框 */}
                <CropImage open={this.state.isCrop} closeCrop={this.closeCrop} avatarCrop={this.state.avatarCrop}></CropImage>
                <div className='my-title'>
                    <img src={'http://localhost:9999/public/my-bg.png'} alt='me'/>
                <div className="info">
                    <div  className="myicon">
                        <img src={this.state.avatar} onClick={this.showImage} alt="icon"/>
                    </div>
                    <div className='name'>{this.state.username}</div>
                        <Button color='green' size='mini'>已认证</Button>
                    <div className='edit'>编辑个人资料</div>
                </div>
                </div>
                    <Grid padded  className='my-menu'>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <Icon name='clock outline' size='big' />
                            <div>看房记录</div>
                        </Grid.Column>
                        <Grid.Column>
                            <Icon name='yen sign' size='big' />
                            <div>我的订单</div>
                        </Grid.Column>
                        <Grid.Column>
                            <Icon name='bookmark outline' size='big' />
                            <div>我的收藏</div>
                        </Grid.Column>
                        <Grid.Column>
                            <Icon name='user outline' size='big' />
                            <div>个人资料</div>
                        </Grid.Column>
                        <Grid.Column>
                            <Icon name='home' size='big' />
                            <div>身份认证</div>
                        </Grid.Column>
                        <Grid.Column>
                            <Icon name='microphone' size='big' />
                            <div>联系我们</div>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                    <div className='my-ad'>
                        <img src={'http://localhost:9999/public/ad.png'} alt=""/>
                    </div>
            </div>
        )
    }
}

export default My

// 模态框组件
class ImageModal extends React.Component{
    constructor(props){
        super(props)
        this.refFile=React.createRef()
    }
    imageFile=()=>{
        // 2.拿到这个文件的路径，input=file，为非受控组件，
        // 要用到ref，通过props.current对象来获取，子->父
        console.log(this.refFile.current.files[0])
        if(this.refFile.current.files[0] === undefined){
            return false
        }else{
            this.props.acceptFile(this.refFile.current.files[0])
        }
        
    }
    render(){
        return (
          <div>
            <Modal size="small" open={this.props.open}>
              <Modal.Header>选择图片</Modal.Header>
              <Modal.Content>
                <input type="file" ref={this.refFile} />
              </Modal.Content>
              <Modal.Actions>
                <Button positive icon='checkmark' onClick={this.imageFile} labelPosition='right' content='确定' />
                {/* <Button  icon='close'  labelPosition='right' content='取消' /> */}
              </Modal.Actions>
            </Modal>
          </div>
        )
    }
}

// 裁切图片的模态框
class CropImage extends React.Component {
    constructor(){
        super()
        this.state={
            scale:1
        }
    }
    // 获取裁切后的图片编辑引入
    setEditorRef = (editor) => this.editor = editor
    // 点击确定
    submitComment = async  (e) => {
        // 1.生成头像数据(把图片生成base64格式的数据)
        const img = this.editor.getImageScaledToCanvas().toDataURL()
        // 发起axios请求
        let res = await this.axios.post('/my/avatar',{
          avatar: img
        })
        let {meta} = res
        if(meta.status === 200){
            // 1、关闭裁切窗口 // 2.更改圆头像
            this.props.closeCrop(img)
           
        }

      }
    handleScale=(e)=>{
        this.setState({
            scale:e.target.value-0
        })
    }
    render(){
        let {open,avatarCrop} = this.props
        return (
            <div>
                <Modal size="small" open={open} >
                <Modal.Header>上传头像</Modal.Header>
                <Modal.Content>
                    <AvatarEditor
                        borderRadius={75}
                        width={160}
                        height={160}
                        border={50}
                        color={[255, 255, 255, 0.6]} // RGBA
                        scale={this.state.scale}
                        rotate={0}
                        image={avatarCrop}
                        ref={this.setEditorRef}
                    />
                    <div>
                        <span className='avatar-zoom'>缩放:</span>
                        <input
                            value={this.state.scale}
                            name="scale"
                            type="range"
                            onChange={this.handleScale}
                            min='1'
                            max="2"
                            step="0.01"
                        />
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive onClick={this.submitComment} icon='checkmark' labelPosition='right' content='确定' />
                </Modal.Actions>
                </Modal>
            </div>
        )
    }
}