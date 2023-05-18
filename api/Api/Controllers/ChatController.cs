using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Azure;
using Azure.AI.OpenAI;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        [HttpGet]
        public async Task<String> GetResponse()
        {
            var openAiClient = new OpenAIClient(
                new Uri("endPointHere"),
                new AzureKeyCredential("keyHere")
            );

            var chatCompletionOptions = new ChatCompletionsOptions { };
            chatCompletionOptions.Messages.Add(new ChatMessage(ChatRole.User, "Who is the tallest in NBA?"));

            var chatCompletionsResponse = await openAiClient.GetChatCompletionsAsync(
                    "modelNameHere",
                    chatCompletionOptions
                );

            return chatCompletionsResponse.Value.Choices[0].Message.Content;
        }
    }
}
