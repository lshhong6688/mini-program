// pages/detail/detail.js
let datas = require('../../datas/list-data.js');
let appDatas = getApp()
console.log(appDatas)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj:{},
    index:null,
    isCollectioned:false,
    isMusicPlay:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    //获取参数
    let index = options.index
    //更新data中datailObj的状态值
    this.setData({
      detailObj: datas.list_data[index],
      index
    })
    //根据缓存数据判断用户是否收藏当前文章
   let detailCollection = wx.getStorageSync('isCollectioned')
  //  console.log(detailCollection)
   //如果用户从来没点击过收藏,将状态设置为空对象
   if (!detailCollection){
     wx.setStorageSync("isCollectioned", {} )
   }  

   if(detailCollection[index]){
      this.setData({
        isCollectioned:true
      })
   }

   //监听音乐播放。
   wx.onBackgroundAudioPlay(()=>{
     console.log("音乐播放")
     this.setData({
       isMusicPlay:true
     })
     //修改appDatas的状态值
     appDatas.data.isPlay = true
     appDatas.data.pageIndex = index
   })

   //判断音乐是否在播放
   if (appDatas.data.isPlay && appDatas.data.pageIndex === index) {
     //进入同一个页面音乐如果在播放就改变背景图,并显示播放状态
     this.setData({
       isMusicPlay: true
     })
   }
   //监听音乐暂停。
   wx.onBackgroundAudioPause(() => {
     console.log("音乐暂停")
     this.setData({
       isMusicPlay:false
     })
     //修改appDatas的状态值
     appDatas.data.isPlay = false
    // appDatas.data.pageIndex = index
   })
   //监听音乐停止。
   wx.onBackgroundAudioStop(()=>{
     console.log("音乐停止")
     this.setData({
       isMusicPlay: false
     })
   })

  },
  
  //收藏的显示隐藏
  handleCollection(){
    // console.log(this)//data里才有isCollectioned属性
    let isCollectioned = !this.data.isCollectioned
    //更新收藏状态
    this.setData({
      isCollectioned
    })
    //消息提示框
    let title = isCollectioned ?"收藏成功":"取消收藏"
    wx.showToast({
      title,
      icon:'success'
    })
    //缓存收藏状态
    //{1,true}
    let {index} = this.data
    // let obj = {}不可行,初始化为空对象,后来的覆盖了
    wx.getStorage({
      key:'isCollectioned',
      success: (datas)=>{
        console.log(datas,typeof datas)
        let obj = datas.data
        obj[index] = isCollectioned
        wx.setStorage({
          key: 'isCollectioned',
          data: obj,
          success: () => {
            console.log('缓存成功')
          }
        })
      }
    })
   
  },

  handleMusicPlay(){
    //切换音乐暂停/播放
    let isMusicPlay = !this.data.isMusicPlay
    this.setData({
      isMusicPlay
    })

    if(isMusicPlay){
      let { dataUrl, title } = this.data.detailObj.music
      wx.playBackgroundAudio({
        dataUrl,
         title 
      })
    }else{
      wx.pauseBackgroundAudio()
    }
  },
  //点击转发功能
  handleShare(){
    wx.showActionSheet({
      itemList: ['分享到朋友圈', '分享到qq空间', '分享到微博']
    })
  }
})