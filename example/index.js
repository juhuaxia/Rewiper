import React , { Component } from "react"
import { render } from "react-dom"
import Rewiper from "../src/index"

import "./index.scss"

class Test extends Component {
    constructor(){
        super()

    }

    swipeTo(){

    }
    render(){
        return (
            <div>
                <Rewiper>
                    <div className="mybox" style={{backgroundColor:"red"}}>1</div>
                    <div className="mybox" style={{backgroundColor:"green"}}>2</div>
                    <div className="mybox" style={{backgroundColor:"yellow"}}>3</div>
                    <div className="mybox" style={{backgroundColor:"blue"}}>4</div>
                </Rewiper>

                <button onClick={this.swipeTo}></button>
            </div>
        )
    }
}

render(
    <Test/>,
    document.getElementById("app")
)
