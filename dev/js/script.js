(function(root) {

  // svg for all
  svg4everybody()
  scrollTo()

  const sliderOptions = {
    'items': {
      cellAlign: 'left',
      pageDots: false,
      prevNextButtons: false,
    }
  }

  document.querySelectorAll('[data-slider]').forEach((slider, i) => {
    const slides = slider.querySelector('[data-slider-slides]'),
          slidesCount = slides.children.length,
          sliderData = slider.dataset.slider,
          options = sliderOptions[sliderData],
          sliderWidth = slider.offsetWidth,
          slideWidth = slides.children[0].offsetWidth,
          slidesCapacity = Math.round(sliderWidth/slideWidth),
          controls = slider.querySelector('[data-slider-controls]'),
          controlsPrev = controls.querySelector('[data-slider-controls-prev]'),
          controlsNext = controls.querySelector('[data-slider-controls-next]'),
          controlsEndIndex = slidesCount - slidesCapacity,
          adaptive = Number(slider.dataset.sliderAdaptive),
          windowWidth = window.innerWidth,
          progressBar = slider.querySelector('[data-slider-progress]'),
          progressStep = Math.round(100 / (slidesCount-slidesCapacity+1))

    progressBar.style.width = `${progressStep}%`

    if (slidesCount > slidesCapacity) {
      slider.classList.add('slider_initial')
      const flkty = new Flickity(slides, sliderOptions[slider.dataset.slider]);

      if (controls) {
        controlsPrev
          .addEventListener('click', (e) => {
            e.preventDefault()
            flkty.previous()
          })

        controlsNext
          .addEventListener('click', (e) => {
            e.preventDefault()
            flkty.next()
            let progressCurrent = parseInt(progressBar.style.left) || 0
            console.log(progressCurrent)
            progressBar.style.left = `${progressCurrent+progressStep}%`
          })

        if (flkty.selectedIndex === 0) {
          controlsPrev.disabled = true
        } else if (flkty.selectedIndex === controlsEndIndex) {
          controlsNext.disabled = true
        }

        flkty.on('select', (index) => {
          controlsPrev.disabled = (index == 0) ? true : false
          controlsNext.disabled = (index == controlsEndIndex) ? true : false
        })

        flkty.on('change', (index) => {
          if (index >= controlsEndIndex) {
            flkty.select(controlsEndIndex)
          }
        })
      }
    }
  })

  // drop

  document.addEventListener('click', (e) => {
    const drop = document.querySelector('[data-drop-state="1"]')

    if (drop && !e.target.closest('.drop.show') && !e.target.closest('[data-drop-state="1"]')) {
      e.preventDefault()
      drop.click()
    }

  })

  document.querySelectorAll('[data-drop]').forEach((drop, i) => {
    drop.addEventListener('click', (e) => {
      e.preventDefault()

      const data = drop.dataset.drop,
            dropContent = document.querySelector(`[data-drop-content="${data}"]`),
            state = Number(drop.dataset.dropState)

      switch (state) {
        case 0:
          dropContent.classList.add('show')
          break
        case 1:
          dropContent.classList.remove('show')
          break
      }

      drop.dataset.dropState = Number(!state)

    })

    drop.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault()
        e.target.click()
      }
    })
  })

  // modals
  document.querySelectorAll('[data-modal-open]').forEach((trigger, i) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault()

      const t = e.target.closest('[data-modal-open]'),
            data = t.dataset.modalOpen,
            modalElement = document.querySelector(`[data-modal="${data}"]`)

      let modalContent = modalElement.innerHTML

      if (data == 'gallery') {
        modalContent = t.innerHTML
      }

      let modal = new tingle.modal({
        closeMethods: ['overlay', 'escape'],
        onClose: function() {
          this.remove()
        },
        cssClass: modalElement.classList
      });

      modal.setContent(modalContent)
      modal.open()

      const forms = modal.modalBoxContent.querySelectorAll('form')

      try {
        document.querySelector('.modal__close').addEventListener('click', (e) => {
          e.preventDefault()
          modal.close()
        })
      } catch (e) {

      }
    })
  })


})(window);
