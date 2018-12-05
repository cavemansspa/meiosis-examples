import { Component } from "react"
import { h } from "./seview-setup"

import { model } from "../common/model"
import { actions } from "../common/actions"
import { view } from "../common/view"

export const app = {
  model,
  actions
}

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = { model: props.models(), skippedFirst: false }
  }

  render() {
    const { model } = this.state
    const { actions } = this.props

    return h(view(model, actions))
  }

  componentDidMount() {
    this.props.models.map(model => {
      if (this.state.skippedFirst) {
        this.setState({ model })
      }
      else {
        this.state.skippedFirst = true
      }
    })
  }
}
