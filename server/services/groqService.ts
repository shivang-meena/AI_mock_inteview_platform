import groq from "../config/groq.js"


async function groqchat(messege:[]) {
    
    try {
      let response =await groq.chat.completions.create({
            model:"llama-3.3-70b-versatile",
            messages:messege
        })
        return response.choices[0]?.message.content;
    } catch (err) {
        console.log(err);
    }
}
export default groqchat;