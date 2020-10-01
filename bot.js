//Import telegraf library
const Telegraf = require('telegraf');

//Use Telegraf class as a constructor to create an instance of the bot
const bot = new Telegraf('1099369548:AAEoqjNi_pCnGIZ_cY8-vWe9wqvFFEm00QU');

//  Common commands that are use in telegram
//  https://telegraf.js.org/#/?id=known-middleware

//  /start
//    ctx = context for one Telegram update.
//    use props to acces Telegram Context, e.g. ctx.first_name, etc.
bot.start((ctx) => {
  ctx.reply(ctx.from.first_name + " have entered the start command and it is a " +
  ctx.updateSubTypes[0] + ".");
});

//  /help
bot.help((ctx) => {
  ctx.reply("You have entered the help command");
});

//  /settings
bot.settings((ctx) => {
  ctx.reply("You have entered the settings command");
});

//Bot Custom Method
bot.command(["test", "Test"], (ctx) => {
  ctx.reply("Hello world");
});

//Bot Hears Method
//  See for a specific word without "/" and return reply
bot.hears("cat", (ctx) => {
  ctx.reply("meow");
});

//Bot On Method
//  Allows bot to handle update types, e.g. sticker, text, etc.
bot.on("sticker", (ctx) => {
  ctx.reply("This is a stickers message");
});

//Bot Mention Method
//  Allows bot to handle username, e.g. @botfather
//  If the mention in the middle of a sentece, it still works
bot.mention("botfather", (ctx) => {
  ctx.reply("mention method");
});

//Bot Phone Method
//  Allows bot to handle phone number, e.g. (62) 8211-260-9637, +62 8211-260-9637
bot.phone("+62 82112609637", (ctx) => {
  ctx.reply("phone method");
});

//Bot Hashtag Method
//  Allows bot to handle hashtag, e.g. #hash
bot.hashtag("hash", (ctx, next) => {
  ctx.reply("hashtag method");

  // To modify the state of the context use state Method
  ctx.state.apple = 5;
  console.log(ctx);

  // Use next function to call the next middleware
  next(ctx);
});

//Bot Use Method
//  Handle all requests by the user
bot.use((ctx) => {
  // ctx.reply("You used the bot");
  ctx.reply("Your apple state is " + ctx.state.apple);
});

//  When using extra parameters,
//  you have to insert an objext as the third parameter
//  with properties (the possible extra parameters)
bot.command('extra', (ctx) => {

  //bot.telegram.sendMessage(chatId, text, [extra])
  bot.telegram.sendMessage(ctx.chat.id, "Extra method",
    {
      parse_mode: 'Markdown',
      disable_notification: true
    }
  );

  //ctx.reply(text, [extra])
  ctx.reply("Extra method",
    {
      parse_mode: 'Markdown',
      disable_notification: true
    }
  );

});

bot.launch();
