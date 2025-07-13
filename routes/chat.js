const express = require("express");
const {authMiddleware}=require("../middleware/auth");
const {Chat} = require("../database/bd");
const openai = require("../openclient");
const router = express.Router();

//first route to ask the questions from the opeanai

router.post("/ask",authMiddleware,async(req,res)=>{
    const userId = req.userId;
    const message = req.body.message;
      
    await Chat.create({
        userId,
        role: "user",
        content : message
    });

   // get recent history
      const history = await Chat.find({ userId }).sort({ createdAt: -1 }).limit(5);
  const messages = history.reverse().map(msg => ({
    role: msg.role,
    content: msg.content
  }));

  messages.push({ role: "user", content: message });

  // Gpt response
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: "You are a helpful assistant." }, ...messages],
  });
   const reply = completion.choices[0].message.content

    // Save reply
  await Chat.create({ userId, role: "assistant", content: reply });

  res.json({ reply });

});
  
// GET /chat/history
router.get("/history", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const history = await Chat.find({ userId }).sort({ createdAt: 1 });
  res.json(history);
});

module.exports = router;






