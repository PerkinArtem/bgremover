import imglyRemoveBackground from "@imgly/background-removal"

class Remover {
  refs = {
    uploadInput: document.querySelector('#upload-input'),
    blockEmpty: document.querySelector('#upload-empty'),
    blockProcessing: document.querySelector('#upload-processing'),
    blockResult: document.querySelector('#result'),
    blockRestart: document.querySelector('#block-restart'),
    processingLoader: document.querySelector('#upload-processing-loader'),
    imagePreview: document.querySelector('#image-preview'),
    imageResult: document.querySelector('#image-result'),
    buttonDownload: document.querySelector('#button-download'),
  }
  
  init() {
    this.refs.uploadInput.addEventListener('change', e => {
      this.refs.blockEmpty.style.display = 'none'
      this.refs.blockProcessing.style.display = 'block'
      const file = e.target.files[0]
      if (file) {
        const url = window.URL.createObjectURL(file)
        this.refs.imagePreview.src = url;
        this.refs.imagePreview.alt = file.name;
        this.initRemover(file)
      } else {
        this.refs.imagePreview.src = this.refs.imagePreview.dataset.src;
      }

    })
  }
  initRemover(image) {
    imglyRemoveBackground(image, {
      progress: (key, current, total) => {
        this.refs.processingLoader.textContent = `Downloading ${key}: ${current} of ${total}`
        console.log(`Downloading ${key}: ${current} of ${total}`);
      }
    })
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      this.refs.blockProcessing.style.display = 'none'
      this.refs.blockResult.style.display = 'block'
      this.refs.imageResult.src = url
      this.refs.buttonDownload.href = url
      this.refs.blockRestart.style.display = 'block'
    })
  }
} 

const remover = new Remover
remover.init()