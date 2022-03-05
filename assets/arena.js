// The Description is returned as Markdown, of course.
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdnjs.cloudflare.com/ajax/libs/markdown-it/12.3.2/markdown-it.min.js';
document.head.appendChild(markdownIt)



const constructElements = (data) => {
	document.title = data.title
	document.getElementById('channel-title').innerHTML = data.title
	document.getElementById('channel-description').innerHTML = window.markdownit().render(data.metadata.description)

	const audioEmbedContainer = document.querySelector('.audio-embed-blocks')
	const audioFileContainer  = document.querySelector('.audio-file-blocks')
	const imageContainer      = document.querySelector('.image-blocks')
	const embedContainer      = document.querySelector('.embed-blocks')
	const linkContainer       = document.querySelector('.link-blocks')
	const pdfContainer        = document.querySelector('.pdf-blocks')
	const textContainer       = document.querySelector('.text-blocks')
	const videoEmbedContainer = document.querySelector('.video-embed-blocks')
	const videoFileContainer  = document.querySelector('.video-file-blocks')

	const audioEmbedBlock = document.getElementById('audio-embed-block')
	const audioFileBlock  = document.getElementById('audio-file-block')
	const imageBlock      = document.getElementById('image-block')
	const embedBlock      = document.getElementById('embed-block')
	const linkBlock       = document.getElementById('link-block')
	const pdfBlock        = document.getElementById('pdf-block')
	const textBlock       = document.getElementById('text-block')
	const videoEmbedBlock = document.getElementById('video-embed-block')
	const videoFileBlock  = document.getElementById('video-file-block')

	data.contents.slice().reverse().forEach((block) => {
		switch (block.class) {

			case 'Attachment':
				let attachment = block.attachment.content_type
				if (attachment.includes('audio')) {
					audioFileContainer.append(audioFileBlock.content.cloneNode(true))
				}
				else if (attachment.includes('pdf')) {
					pdfContainer.append(pdfBlock.content.cloneNode(true))
				}
				else if (attachment.includes('video')) {
					videoFileContainer.append(videoFileBlock.content.cloneNode(true))
				}
				break

			case 'Image':
				imageContainer.append(imageBlock.content.cloneNode(true))
				break

			case 'Link':
				linkContainer.append(linkBlock.content.cloneNode(true))
				break

			case 'Media':
				let media = block.embed.type
					if (media.includes('rich')) {
						audioEmbedContainer.append(audioEmbedBlock.content.cloneNode(true))
					}
					else if (media.includes('video')) {
						videoEmbedContainer.append(videoEmbedBlock.content.cloneNode(true))
					}
				break

			case 'Text':
				textContainer.append(textBlock.content.cloneNode(true))
				break
		}
	})
}



window.addEventListener('DOMContentLoaded', () => {
	const channel = document.getElementById('channel-url').href.split('/').filter(Boolean).pop()

	fetch(`https://api.are.na/v2/channels/${channel}?per=100`, {cache: 'no-store'})
		.then(response => response.json())
		.then(data => {
			constructElements(data)
		})
});
