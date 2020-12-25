class Interaction {
    constructor(client, request) {
      this.client = client;
      this.request = request;
      this.responseType = 4;
    }
    
    async sendMessage(content) {
      const client = this.client;
      const request = this.request;
      const type = this.responseType;
      client.api.interactions(request.id, request.token).callback.post({
        data: {
          type: type,
          data: {
            content: content,
          }
        }
      });
    }
  
    async sendEphemeral(content) {
      const client = this.client;
      const request = this.request;
      const type = this.responseType;
      client.api.interactions(request.id, request.token).callback.post({
        data: {
          type: type,
          data: {
            content: content,
            flags: 64
          }
        }
      });
    }
  
    async sendEmbed(embed) {
      const client = this.client;
      const request = this.request;
      const type = this.responseType;
      client.api.interactions(request.id, request.token).callback.post({
        data: {
          type: type,
          data: await this.createAPIMessage(embed)
        }
      });
    }
  
    async createAPIMessage(embed) {
      const discord = require('discord.js');
      const client = this.client;
      const request = this.request;
      const apiMessage = await discord.APIMessage.create(client.channels.resolve(request.channel_id), embed)
        .resolveData()
        .resolveFiles()
  
      return { ...apiMessage.data, files: apiMessage.files };
    }
  }
  
  module.exports = Interaction;