import axios from '../config/req_api'

interface options {
  headers: {
    'Authorization': string,
    'Content-Type': string
  }
}


export class webhooksLine {
  private replyToken: string | null
  private userId: string | null
  private tokenChannel: string
  private option: options

  constructor(replyToken: string | null, userId: string | null, tokenChannel: string) {
    this.replyToken = replyToken
    this.userId = userId
    this.tokenChannel = tokenChannel
    this.option = {
      headers: {
        'Authorization': `Bearer ${this.tokenChannel}`,
        'Content-Type': 'application/json'
      }
    }
  }

  public async follow(messages: any) {
    console.info(`CASE: FOLLOW`)
    try {
      if (!messages || messages.length <= 0) return null
      await axios.post(process.env.lineReplyToken as string, {
        replyToken: this.replyToken,
        messages: messages.slice(0, 10)
      }, this.option)
    } catch (error) {
      console.debug(error)
      await axios.post(process.env.linePushToken as string, {
        to: this.userId,
        messages: messages.slice(0, 10)
      }, this.option)
    }
  }

  private unfollow() {

  }

  public async send(messages: any) {
    console.info(`CASE: SEND-MESSAGE`, messages)
    try {
      if (!messages || messages.length <= 0) return null
      await axios.post(process.env.lineReplyToken as string, {
        replyToken: this.replyToken,
        messages: messages.slice(0, 10)
      }, this.option)
    } catch (error) {
      console.debug(error)
      await axios.post(process.env.linePushToken as string, {
        to: this.userId,
        messages: messages.slice(0, 10)
      }, this.option)
    }
  }
}