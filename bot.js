//Import telegraf library
const Telegraf = require('telegraf');

//Use Telegraf class as a constructor to create an instance of the bot
const bot = new Telegraf('1332978521:AAFEuBZ1NlyZvXKpWaXsFMn_bJJRdafyl_g');

const helpMessage = `
Say something to me
/start - start the bot
/help - command reference
`;

//feature to let us know that someone is using our bot
bot.use((ctx, next) => {
  // console.log("Someone used your bot");
  // console.log(ctx.from);

  if (ctx.updateSubTypes[0] == "text") {
    //to see the group id, use ctx.chat
    //send a message to a spesific group, e.g. echo bot logs
    bot.telegram.sendMessage(-407937449, ctx.from.first_name + " said: " + ctx.message.text);
  } else {
    bot.telegram.sendMessage(-407937449, ctx.from.first_name + " sent " + ctx.updateSubTypes[0]);
  }

  next();
});

bot.start((ctx) => {
  ctx.reply("Hi I am Echo Bot");
  ctx.reply(helpMessage);
});

bot.help((ctx) => {
  ctx.reply(helpMessage);
});

bot.command("echo", (ctx) => {
  let input = ctx.message.text; //get input from user
  let inputArray = input.split(" "); //split input by spaces
  let message = ""; //create a variable for message to output to user

  if (inputArray.length == 1) { //check if array just contains "/echo"
    message = "You said echo";
  } else {
    inputArray.shift(); //remove the first element of the array
    message = inputArray.join(" "); //join all elements into a string separated by spaces
  }

  ctx.reply(message); //send reply message to user
});

bot.launch();
