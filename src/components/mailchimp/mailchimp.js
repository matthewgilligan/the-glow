import React from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { Typography } from "@material-ui/core"

export default class MailChimpForm extends React.Component {
  constructor() {
    super()
    this.state = { email: "", result: null }
  }

  _handleSubmit = async e => {
    e.preventDefault()
    const result = await addToMailchimp(this.state.email)
    this.setState({result: result})
  }

  handleChange = event => {
    this.setState({ email: event.target.value })
  }

  render() {
    return this.state.result === "success " ? (
      <div>SUCCESS</div>
    ) : this.state.result === "error" ? (
      <div>ERROR</div>
    ) : (
      <form onSubmit={this._handleSubmit}>
        <TextField
          id="outlined-email-input"
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          variant="outlined"
          onChange={this.handleChange}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          label="Submit"
          type="submit"
        >
          <Typography variant="button">Subscribe</Typography>
        </Button>
      </form>
    )
  }
}
