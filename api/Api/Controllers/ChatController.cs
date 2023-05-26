using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Azure;
using Azure.AI.OpenAI;
using Microsoft.Extensions.Configuration;
using Api.Model;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IConfiguration config;

        public ChatController(IConfiguration config)
        {
            this.config = config;
        }

        [HttpGet]
        public async Task<ChatMsg> GetResponse(string query)
        {
            OpenAIClient client = new OpenAIClient(
                new Uri(config["AzureEndPoint"]),
                new AzureKeyCredential(config["AzureKey"])
            );

            ChatCompletionsOptions option = new ChatCompletionsOptions { };
            option.Messages.Add(new ChatMessage(ChatRole.User, query));

            Response<ChatCompletions> response = await client.GetChatCompletionsAsync(
                    config["ModelName"],
                    option
                );
            return new ChatMsg { Message = response.Value.Choices[0].Message.Content };
        }
    }
}
