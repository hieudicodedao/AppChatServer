const emojiRegex = require('emoji-regex/RGI_Emoji.js')

const regex = emojiRegex()
// let text = 'hello <3'
const text = `
hello <3
`
let match
while ((match = regex.exec(text))) {
	const emoji = match[0]
	console.log(`Matched sequence ${emoji} — code points: ${[...emoji].length}`)
}
