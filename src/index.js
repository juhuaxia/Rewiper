import React , { Component } from "react"
import propTypes from "prop-types"
import classnames from "classnames"
import "./statics/index.scss"

class Rewiper extends Component {
    constructor(props){
        super()

        this.state = {
            movedX:0,
            changeTransitionDuration:false
        }
        this.__uid = 0 //for map key
        this.__index = 0 //索引
        this.hasTriggerLeave = false
        this.startX = 0 //鼠标点击时候坐标
        this.nowX = 0 //当前保持的tanslateX
        this.movedX = 0 //当前移动的距离
        this.width = 0 //当前sider宽度
        this.dir = "left" //滑动方向，默认往左
        this.sliderLength = props.children.length || 0 //slider length

        this.shouldTriggerMoveHandle = false
        this.containerRef = this.containerRef.bind(this)
        this.mouseDownHandle = this.mouseDownHandle.bind(this)
        this.mouseMoveHandle = this.mouseMoveHandle.bind(this)
        this.leaveHandle = this.leaveHandle.bind(this)
    }

    containerRef(container){
        this.container = container
        this.width = this.container.offsetWidth
    }
    
    mouseDownHandle(e){
        this.startX = e.pageX
        this.shouldTriggerMoveHandle = true
        this.hasTriggerLeave = false
    }

    mouseMoveHandle(e){
        if(this.state.changeTransitionDuration === false){
            this.setState({
                changeTransitionDuration:true
            })
        }
        if(this.shouldTriggerMoveHandle === true){
            let currentX = e.pageX
                this.movedX = currentX - this.startX
                
                let tanslateX = this.movedX + this.nowX
                // console.log(this.movedX,tanslateX,this.nowX)
                this.container.style.transform = "translate3d("+tanslateX+"px, 0px, 0px)"

                if(this.movedX >= 0){
                    this.dir = "right"
                }else{
                    this.dir = "left"
                }
        }
    }

    leaveHandle(){
        if( this.hasTriggerLeave === false){
            this.setState((prestate)=>({
                changeTransitionDuration:!prestate.changeTransitionDuration
            }))
            if(Math.abs(this.movedX) >= this.width / 2){
                if(this.dir === "left"){
                    this.__index > this.sliderLength - 2 ? this.sliderLength : this.__index++
                    this.nowX = 0 - this.width* this.__index
                }else{
                    this.__index <= 0 ? 0 : this.__index--
                    this.nowX = 0 - this.width* this.__index
                }
            }else{
                this.nowX = 0 - this.width* this.__index
            }
            this.container.style.transform = "translate3d("+this.nowX+"px, 0px, 0px)"
            this.shouldTriggerMoveHandle = false

            this.hasTriggerLeave = true
        }
    }

    render(){
        let containerCls = classnames({
            "react-swiper-container": true,
            "mousemove-container": this.state.changeTransitionDuration
        })
        return (
            <div className="react-swiper">
                <div ref={this.containerRef}
                    className={containerCls}
                    onMouseDown={this.mouseDownHandle} 
                    onMouseMove={this.mouseMoveHandle}
                    onMouseUp={this.leaveHandle}
                    onMouseOut={this.leaveHandle}
                    >
                    {
                        React.Children.map(this.props.children,(child)=>{
                            let _uid = this.__uid++
                            return (
                                <div className="react-swipe" key={_uid}>
                                    {React.cloneElement(child)}
                                </div>
                            )
                        })
                    }
                    <div className="clearFloat"></div>
                </div>
            </div>
        )
    }
}

Rewiper.propTypes = {
    children:propTypes.array
}

export default Rewiper