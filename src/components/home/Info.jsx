import React from "react"
import "./Info.css"
import {Tab} from "semantic-ui-react"
class Info extends React.Component {
    render(){
        const panes = [
            { menuItem: '资讯', render: () => <Tab.Pane>
              {/* <RecoMessage/> */}
            </Tab.Pane> },
            { menuItem: '头条', render: () => <Tab.Pane>
              {/* <TopMessage/> */}
            </Tab.Pane> },
            { menuItem: '问答', render: () => <Tab.Pane>
              {/* <AskAnswer/> */}
            </Tab.Pane> },
          ]
        return (
            <div className='find-container'>
                <div className="find-topbar">资讯</div>
                <div className="find-content">
                    <Tab panes={panes} />
                </div>
            </div>
        )
    }
}

export default Info